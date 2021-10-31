from django.shortcuts import render, redirect
from django.conf import settings
from math import sin, cos, radians, acos, degrees
import datetime
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import base64, secrets, io
from userauth.models import Employee
from django.core.files.base import ContentFile
from PIL import Image
from absen.models import Presence, CheckinRecord, CheckoutRecord
from django.contrib import messages
import json
import logging
import os
from django.conf import settings
import subprocess
from django.http import JsonResponse, HttpResponse


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
        presence_now = Presence(employee_id=current_user, presence_date = nowDate.strftime("%Y-%m-%d"))
        presence_now.save()

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
        tmp_image = Presence.objects.filter(employee_id__user_id=request.user.id, presence_date=nowDate.strftime("%Y-%m-%d"))[0]
        if name == "checkin":
            tmp_image.checkin_time = nowDate.strftime("%X")
            tmp_image.checkin_img = data
            
        elif name == "checkout":
            tmp_image.checkout_time = nowDate.strftime("%X")
            tmp_image.checkout_img = data
        tmp_image.save()

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
        detect_process = subprocess.getoutput(f'curl -X POST -F image=@{settings.MEDIA_ABS_PATH}{img_name} "{settings.API_SERVER}"')
        
        result = eval(detect_process.split('\n')[-1])            
        
        return result
        
        
    if request.headers.get('x-requested-with') == "XMLHttpRequest":
        json_request = json.loads(request.body)
        data_url = json_request['image']
        presence_type = json_request['name']
        nowDate = datetime.datetime.now()
        
        get_image(data_url,presence_type)
        
        tmp_image = Presence.objects.filter(employee_id__user_id=request.user.id, presence_date=nowDate.strftime("%Y-%m-%d"))[0]
        img_name = eval(f"tmp_image.{presence_type}_img.url")
        
        detect_result = detect_image(img_name=img_name)
        
        logging.info(detect_result)
        
        is_success = bool(detect_result["success"])
        
        # Delete data and temporary image if no faces detected
        if is_success and detect_result["num_faces"] > 0:
            
            context = {
                "title" : "Presensi Berhasil",
                "text" : "Selamat bekerja dan mengajar",
                "icon" : "success",
                "button" : "OK",
                "status" : "success"
            }
            
        else:
            if presence_type == "checkin":
                tmp_image.checkin_time = None
                tmp_image.checkin_img = None
            elif presence_type == "checkout":
                tmp_image.checkout_time = None
                tmp_image.checkout_img = None
            os.remove(settings.MEDIA_ABS_PATH + img_name)
            context = {
                "title" : "Presensi Gagal",
                "text" : "Pastikan wajah terlihat di kamera dengan jelas",
                "icon" : "error",
                "button" : "Ulangi",
                "status" : "failed"
            }
            
        return JsonResponse(context)
        
    
    else:
        distance, dist_message = calculate_distance()
        context = {
            'distance': distance,
            'dist_message': dist_message,
            'today': f"{INDONESIAN_FORMAT['day'][TODAY.strftime('%A')]}, {TODAY.day} {INDONESIAN_FORMAT['month'][TODAY.month]} {TODAY.year}",
            'time': TODAY.strftime('%X'),
            'greetings': greetings(TODAY),
        }
        response = render(request, 'absen.html', context)
        
        return response