from django.shortcuts import render, redirect
from django.conf import settings
from math import sin, cos, radians, acos, degrees
import datetime
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import base64
from face_detection.views import detect
from userauth.models import Employee, Days
from django.core.files.base import ContentFile
from absen.models import Presence, CheckinRecord, CheckoutRecord
import json
import logging
import os
from django.conf import settings
import subprocess
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
import requests

# Get current date and time
TODAY = datetime.datetime.now()

# Indonesian date format for conversion later
INDONESIAN_FORMAT = {
    'day':{
        'Sunday': 'Minggu',
        'Monday': 'Senin',
        'Tuesday': 'Selasa',
        'Wednesday': 'Rabu',
        'Thursday': 'Kamis',
        'Friday': 'Jumat',
        'Saturday': 'Sabtu'
    },
    'month':{
        1: 'Januari',
        2: 'Februari',
        3: 'Maret',
        4: 'April',
        5: 'Mei',
        6: 'Juni',
        7: 'Juli',
        8: 'Agustus',
        9: 'September',
        10: 'Oktober',
        11: 'November',
        12: 'Desember'
    }
}

@login_required
@csrf_exempt
def absen(request):

    TODAY = datetime.datetime.now()

    nowDate = datetime.datetime.now()
    current_user = Employee.objects.filter(user_id__id=request.user.id)[0]
    try:
        Presence.objects.filter(employee_id=current_user, presence_date=nowDate.strftime("%Y-%m-%d"))[0]
        
    except:
        work_days = Days.objects.get(employee_id=current_user)
        today = nowDate.strftime('%A').lower()
        try:
            exec(f"""if work_days.{today} == True:
                
                presence_now = Presence(employee_id=current_user, presence_date = nowDate.strftime('%Y-%m-%d'))
                presence_now.save()""")
        except:
            pass

    def check_record(request=request):
        try:
            checkin_record = CheckinRecord.objects.filter(employee_id=current_user)[0]
            checkout_record = CheckoutRecord.objects.filter(employee_id=current_user)[0]
            return checkin_record, checkout_record
        except:
            CheckinRecord.objects.create(employee_id=current_user)
            CheckoutRecord.objects.create(employee_id=current_user)
            checkin_record = CheckinRecord.objects.filter(employee_id=current_user)[0]
            checkout_record = CheckoutRecord.objects.filter(employee_id=current_user)[0]
            return checkin_record, checkout_record
        
    # Location and Distance
    def get_real_location(request=request):
        # Retrieve latitude and longitude coordinates from cookies that have been set using javascript in geolocation.js
        latitude, longitude = request.COOKIES.get('latitude'), request.COOKIES.get('longitude')
        return latitude, longitude
    
    def calculate_distance(host_coord=get_real_location(),server_coord=settings.LANDMARK_COORDINATES):
        # Extracting host coordinates into each latitude and longitude
        host_lat, host_lon = host_coord
        
        # Check if GPS is turned on
        if host_lat and host_lon is not None:
            host_lat, host_lon = float(host_lat), float(host_lon)
            
            # Extracting server coordinates into each latitude and longitude
            server_lat, server_lon = server_coord
            
            if (host_lat == server_lat) and (host_lon == server_lon):
                # Exactly the same coordinates
                return 0
            else:
                theta = server_lon - host_lon
                dot_distance = sin(radians(server_lat)) * sin(radians(host_lat)) + cos(radians(server_lat)) * cos(radians(host_lat)) * cos(radians(theta))
                dot_distance = degrees(acos(dot_distance))
                
                # Conversion in any units
                miles = dot_distance * 60 * 1.1515
                kilometers = round((miles * 1.609344),1)
                meters = int(kilometers * 1000)
                
                # Message for absen page
                dist_message = f"Anda berada <span>{meters} M</span>  di luar jangkauan sekolah" if meters < 1e3 else f"Anda berada <span>{kilometers} KM</span> di luar jangkauan sekolah" 
                

                dist_message = f"Anda berada <span>{meters}m</span> di luar jangkauan sekolah" if meters < 1e3 else f"Anda berada <span>{kilometers}km</span> di luar jangkauan sekolah" 

                return meters, dist_message
            
        # Message to turn on the GPS for user
        else:
            dist_message = "Tolong izinkan akses lokasi"
            return 999999, dist_message

    # Greetings for absen page
    def greetings(time):
        hour = int(time.strftime('%H'))

        if hour >= 3 and hour < 11:
            return "Selamat Pagi"
        elif hour >= 11 and hour < 16:
            return "Selamat Siang"
        elif hour >= 16 and hour < 19:
            return "Selamat Sore"
        else:
            return "Selamat Malam"
        
    # Get base64 encoded image from XHRHttpRequest post
    def get_image(data_url, name):
        # Decode base64 string image
        _format, _img_str = data_url.split(';base64,')
        _name, ext = _format.split('/')
        data = ContentFile(base64.b64decode(_img_str),name=f"{TODAY.strftime('%c')}-{request.user.username}.{ext}")
        
        # Get logged in user to save temporary image

        # Save image to TempImage model with foreign key identified by logged in user / current user
        nowDate = datetime.datetime.now()
        
        now_time = int(nowDate.strftime("%H"))
        presence_img = Presence.objects.filter(employee_id__user_id=request.user.id, presence_date=nowDate.strftime("%Y-%m-%d"))[0]
        if name == "checkin":
            presence_img.checkin_time = nowDate.strftime("%X")
            presence_img.checkin_img = data
            if now_time > settings.CHECKIN_TIME:
                presence_img.checkin_desc = "Terlambat"
            else:
                presence_img.checkin_desc = "Tepat Waktu"
            
        elif name == "checkout":
            presence_img.checkout_time = nowDate.strftime("%X")
            presence_img.checkout_img = data
            if now_time > settings.CHECKOUT_TIME:
                presence_img.checkout_desc = "Terlambat"

            else:
                presence_img.checkout_desc = "Tepat Waktu"
        presence_img.save()

    def detect_image(img_name):
        """Take a temporary image from database for face detection
        :rtype: dict
        :return: result in this dictionary {"is_success", "num_faces", "faces_rect_coordinates"}
        """
        
        # Set logging config for debugging
        logging.basicConfig(level=logging.NOTSET)
    
        # Logging image name to console
        logging.info(img_name)
        
        # Detect image with preserved API with curl and assign the result in a variable 
        image_bin = {'image': open(f"{settings.MEDIA_ABS_PATH}{img_name}", 'rb')}
        request = requests.post(settings.API_SERVER, files=image_bin, verify=False)
        
        # Drop curl proccess
    
        result = request.json()    
        
        logging.info(result)
        
        return result
        
    
    # Condition when user clicked the presence button    
    if request.headers.get('x-requested-with') == "XMLHttpRequest":
        # Data has presemted in a json
        json_request = json.loads(request.body)
        
        # Get attribute of XHR post which is represented in json
        data_url = json_request['image']
        presence_type = json_request['name']
        
        # Initiate now time
        nowDate = datetime.datetime.now()
        
        # Get image from XHR post (the image is in base64 string, get_image function will convert it to png format)
        get_image(data_url,presence_type)
        
        # Get current user presence record
        presence_img = Presence.objects.filter(employee_id__user_id=request.user.id, presence_date=nowDate.strftime("%Y-%m-%d"))[0]
        img_name = eval(f"presence_img.{presence_type}_img.url")
        
        # Result of detection is on dictionary format {success, num_faces, faces_rect_coordinates}
        detect_result = detect_image(img_name=img_name)
        
        # Loggin the result in terminal
        logging.info(detect_result)
        
        is_success = bool(detect_result["success"])
        
        # Save image if faces detected
        if is_success and detect_result["num_faces"] > 0:
            
            if presence_type == "checkin":
                record_type = "CheckinRecord"
            elif presence_type == "checkout":
                record_type = "CheckoutRecord"
            
            presence_record = eval(f"{record_type}.objects.filter(employee_id=current_user)[0]")
            presence_record.time = timezone.now()
            presence_record.is_checked = True
            presence_record.save()
            
            context = {
                "title" : "Presensi Berhasil",
                "text" : "Selamat bekerja dan mengajar",
                "icon" : "success",
                "button" : "OK",
                "status" : "success"
            }
        
        # Delete data and temporary image if no faces detected
        else:
            if presence_type == "checkin":
                presence_img.checkin_time = None
                presence_img.checkin_img = None
                presence_img.checkin_desc = None
            elif presence_type == "checkout":
                presence_img.checkout_time = None
                presence_img.checkout_img = None
                presence_img.checkout_desc = None
            presence_img.save()
            # The image file also deleted
            os.remove(settings.MEDIA_ABS_PATH + img_name)
            context = {
                "title" : "Presensi Gagal",
                "text" : "Pastikan wajah terlihat di kamera dengan jelas",
                "icon" : "error",
                "button" : "Ulangi",
                "status" : "failed"
            }
            
        # Return JSON Response to fetch in javascript
        response = JsonResponse(context)
        return response
        
    elif request.POST:
        excuse = request.POST.get('excuse')
        proof = request.FILES['proof'] 
        now_date = timezone.now()
        
        excused_presence = Presence(
                                    employee_id = request.user.employee,
                                    presence_date = now_date.strftime("%Y-%m-%d"),
                                    checkin_time = now_date.strftime("%X"),
                                    checkout_time = now_date.strftime("%X"),
                                    checkin_desc = excuse,
                                    checkout_desc = excuse,
                                    checkin_img = proof,
                                    checkout_img = proof
                                    )
        
        excused_presence.save()
        
        excused_checkin = CheckinRecord(employee_id=request.user.employee,
                                        time=now_date,
                                        is_checked=True)
        excused_checkin.save()
        
        excused_checkout = CheckoutRecord(employee_id=request.user.employee,
                                        time=now_date,
                                        is_checked=True)
        excused_checkout.save()
        
        checkin_record, checkout_record = check_record()
        distance, dist_message = calculate_distance()
        context = {
            'distance': distance,
            'dist_message': dist_message,
            'today': f"{INDONESIAN_FORMAT['day'][TODAY.strftime('%A')]}, {TODAY.day} {INDONESIAN_FORMAT['month'][TODAY.month]} {TODAY.year}",
            'time': TODAY.strftime('%X'),
            'greetings': greetings(TODAY),
            'checkin_record': checkin_record,
            'checkout_record': checkout_record,
        }
        
        response = render(request, 'absen.html', context)
        
        return response
        
        
    else:
        checkin_record, checkout_record = check_record()
        distance, dist_message = calculate_distance()
        
        
            
        context = {
            'distance': distance,
            'dist_message': dist_message,
            'today': f"{INDONESIAN_FORMAT['day'][TODAY.strftime('%A')]}, {TODAY.day} {INDONESIAN_FORMAT['month'][TODAY.month]} {TODAY.year}",
            'time': TODAY.strftime('%X'),
            'greetings': greetings(TODAY),
            'checkin_record': checkin_record,
            'checkout_record': checkout_record,
        }
        
        response = render(request, 'absen.html', context)
        
        return response
    
@login_required
def show_absen(request):
    return render(request, 'tampil_absen.html', { "id": request.user.id} )

