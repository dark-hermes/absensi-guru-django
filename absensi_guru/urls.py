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
from laporan.views import *
from django.contrib.auth.views import LoginView, LogoutView
from userauth.views import add_user, delete_user
from django.conf.urls.static import static
from absen.viewset_api import *
from laporan.viewset_api import *
from rest_framework import routers
from administrator.views import *

router = routers.DefaultRouter()
router.register('showabsen', PresenceViewset, basename='Presence')
router.register('presence/checkin', CheckinViewset, basename='CheckinRecord')
router.register('presence/checkout', CheckoutViewset, basename='CheckoutRecord')
router.register('presence/days', DaysViewset, basename='Days')
router.register('classes', ClassViewset)
router.register('subjects', SubjectViewset)
router.register('laporan/belajar', StudyReportViewset, basename='StudyReport')
router.register('laporan/bimbingan', GuidanceReportViewset, basename='GuidanceReport')
router.register('laporan/pengembangan', HumanDevelopmentReportViewset, basename='HumanDevelopmentReport')
router.register('laporan/karya-inovatif', InnovativeWorkReportViewset, basename='InnovativeWorkReport')
router.register('laporan/karya-ilmiah', ScientificWorkReportViewset, basename='ScientificWorkReport')
router.register('laporan/tugas-lainnya', DutyReportViewset, basename='DutyReport')
router.register('users', EmployeeViewset, basename='Users')


urlpatterns = [
    path('api/', include(router.urls)),
    path('', LoginView.as_view(), name='index'),
    path('absen/', absen, name='absen'),
    path('face_detection/detect/', detect),
    path('login/', LoginView.as_view(), name='login' ),
    path('logout/', LogoutView.as_view(next_page='/login'), name='logout'),
    path('delete-user/<int:id_user>',delete_user, name='delete_user'),
    path('absen/show', show_absen, name="show_absen"),
    path('laporan/belajar/add', study_report, name='study_report'),
    path('laporan/bimbingan/add', guidance_report, name='guidance_report'),
    path('laporan/karya-ilmiah/add', scientific_work_report, name='scientific_work_report'),
    path('laporan/karya-inovatif/add', innovative_work_report, name='innovative_work_report'),
    path('laporan/pengembangan-diri/add', human_development_report, name='human_development_report'),
    path('laporan/tugas-lainnya/add', duty_report, name='duty_report'),
    path('laporan/belajar/show', show_study_report, name='show_study_report'),
    path('laporan/bimbingan/show', show_guidance_report, name='show_guidance_report'),
    path('laporan/karya-ilmiah/show', show_scientific_work_report, name='show_scientific_work_report'),
    path('laporan/karya-inovatif/show', show_innovative_work_report, name='show_innovative_work_report'),
    path('laporan/pengembangan-diri/show', show_human_development_report, name='show_human_development_report'),
    path('laporan/tugas-lainnya/show', show_duty_report, name='show_duty_report'),
    path('admin/dashboard', show_dashboard_admin, name='show_dashboard_admin'),
    path('admin/rekap-absen', show_absen_admin, name='show_absen_admin'),
    path('admin/rekap-laporan', show_laporan_admin, name='show_laporan_admin'),
    path('admin/user-list', show_users_admin, name='show_users_admin'),
    path('admin/add-user', add_user, name='add_user_admin'),
    path('admin/add-user-bulk', add_user_bulk, name='add_user_bulk'),
    path('admin/undo-add-user-bulk', undo_add_user_bulk, name='undo_add_user_bulk'),
    path('admin/edit-password', edit_password_admin, name='edit_password'),
    path('admin/edit-role', edit_role_admin, name='edit_role'),
]

# path('admin/', admin.site.urls),

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
