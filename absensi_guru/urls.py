"""absensi_guru URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from absen.views import *
from face_detection.views import *
from django.contrib.auth.views import LoginView, LogoutView
from userauth.views import add_user, delete_user
from django.conf.urls.static import static
from absen.viewset_api import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('showabsen', PresenceViewset, basename='Presence')

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('', LoginView.as_view(), name='index'),
    path('absen/', absen, name='absen'),
    path('face_detection/detect/', detect),
    path('login/', LoginView.as_view(), name='login' ),
    path('logout/', LogoutView.as_view(next_page='/login'), name='logout'),
    path('add-user/', add_user, name='add-user'),
    path('delete-user/<int:id_user>',delete_user, name='delete_user'),
    path('absen/show/', show_absen, name="show_absen"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
