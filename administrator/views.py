from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group, User
from userauth.models import Days, Employee
import csv
from django.conf import settings
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
def add_user_bulk(request):
    with open(settings.MEDIA_ABS_PATH + '/media/guidance_report/user_absen_sija.csv') as users:
        users = csv.reader(users, delimiter=';')
        for user in users:
            name = user[2].split(' ')
            name.pop()
            name = ' '.join(name)
            User.objects.create(
                username=user[0],
                first_name=name,
                last_name=user[3],
                password=make_password(user[1])
            )
            
            Employee.objects.create(
                user_id=User.objects.latest('id').id,
                full_name=user[2],
                position=user[4]
            )
            
            Days.objects.create(
                monday=user[6],
                tuesday=user[7],
                wednesday=user[8],
                thursday=user[9],
                friday=user[10],
                employee_id=Employee.objects.latest('id')
            )
            
            group = Group.objects.get(name=user[5])
            group.user_set.add(User.objects.latest('id'))
    
    # Bulk Delete for emergency
    # users = User.objects.filter(username__contains='smk')
    # for user in users:
    #     user.delete()
            
    return render(request, 'bulk-add-users-admin.html')

            