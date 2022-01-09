from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required

# Create your views here.
@login_required
@staff_member_required
def show_absen_admin(request):
    return render(request, 'absen-admin.html')

@login_required
@staff_member_required
def show_dashboard_admin(request):
    return render(request, 'dashboard-admin.html')

@login_required
@staff_member_required
def show_laporan_admin(request):
    return render(request, 'laporan-admin.html')

@login_required
@staff_member_required
def show_users_admin(request):
    return render(request, 'users-admin.html')

@login_required
@staff_member_required
def add_user_admin(request):
    return render(request, 'add-admin.html')