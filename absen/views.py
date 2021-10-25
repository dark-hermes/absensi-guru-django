from django.shortcuts import render
from django.conf import settings
from math import sin, cos, sqrt, atan2, radians, acos, degrees
import datetime
from django.views.decorators.csrf import csrf_exempt
import base64, secrets, io
from django.core.files.base import ContentFile
from PIL import Image
from absen.models import TempImage


TODAY = datetime.datetime.now()

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




@csrf_exempt
def absen(request):

    # Location and Distance
    def get_real_location(request=request):
        # Retrieve latitude and longitude coordinates from cookies that have been set using javascript in geolocation.js
        latitude, longitude = request.COOKIES.get('latitude'), request.COOKIES.get('longitude')
        return latitude, longitude
    
    
    def calculate_distance(host_coord=get_real_location(),server_coord=settings.LANDMARK_COORDINATES):
        # Extracting host coordinates into each latitude and longitude
        host_lat, host_lon = host_coord
        
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
                
                miles = dot_distance * 60 * 1.1515
                kilometers = round((miles * 1.609344),1)
                meters = int(kilometers * 1000)
                
                # Message for absen page
                dist_message = f"Anda berada {meters}m di luar jangkauan sekolah" if meters < 1e3 else f"Anda berada {kilometers}km di luar jangkauan sekolah" 
                
                return meters, dist_message
        else:
            dist_message = "Tolong izinkan akses lokasi"
            return 999999, dist_message
    
    def get_image(data_url, resize=True, base_width=600):
        _format, _dataurl = data_url.split(';base64,')
        _filename, _extension = secrets.token_hex(20), _format.split('/')[-1]
        
        file = ContentFile(base64.b64decode(_dataurl), name=f"{_filename}.{_extension}")
        
        if resize:
            image = Image.open(file)
            image_io = io.BytesIO()
            
            w_percent = (base_width / float(image.size[0]))
            h_size = int((float(image.size[1]) * float(w_percent)))    
            image = image.resize((base_width, h_size))
    distance, dist_message = calculate_distance()
    
    context = {
        'distance': distance,
        'dist_message': dist_message,
        'today': f"{INDONESIAN_FORMAT['day'][TODAY.strftime('%A')]}, {TODAY.day} {INDONESIAN_FORMAT['month'][TODAY.month]} {TODAY.year}",
        'time': TODAY.strftime('%X'),
        'image': image
    }
    
    response = render(request, 'absen.html', context)
    
    return response