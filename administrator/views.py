from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group, User
from userauth.models import Days, Employee
from django.contrib import messages
import csv
from django.conf import settings
import logging
from absensi_guru import forms



# Create your views here.
logging.basicConfig(level=logging.NOTSET)
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
    is_action = request.GET
    user_id = is_action.get('edit') if is_action.get('edit') != None else is_action.get('delete')
    
    if is_action:
        if is_action.get('delete') != None:
            user = User.objects.get(employee__id=user_id)
            user.delete()
            return render(request, 'users-admin.html')
        
        elif is_action.get('edit') != None:
            
            
            credential = User.objects.get(employee__id=user_id)
            employee = Employee.objects.get(id=user_id)
            days = Days.objects.get(employee_id=user_id)
            
            if request.POST:
                credential_form = forms.EditCredentialForm(request.POST, instance=credential)
                employee_form = forms.EditEmployeeForm(request.POST, instance=employee)
                days_form = forms.DaysForm(request.POST, instance=days)
                print(credential_form.errors)
                
                if credential_form.is_valid() and employee_form.is_valid() and days_form.is_valid():
                    credential_form_f = credential_form.save(commit=False)
                    first_name = request.POST.get('full_name').split(' ')
                    first_name.pop()
                    first_name = ' '.join(first_name)
                    credential_form_f.first_name = first_name
                    credential_form_f.last_name = request.POST.get('full_name').split()[-1]
                    
                    credential_form_f.save()
                    
                    employee_form.save()
                    
                    days_form.save()
                    
                    return redirect('show_users_admin')
                
                elif not credential_form.is_valid():
                    context = {
                        'credential_form': forms.EditCredentialForm(instance=credential),
                        'employee_form': forms.EditEmployeeForm(instance=employee),
                        'days_form': forms.DaysForm(instance=days),
                        'message': "Gagal menyunting pengguna, username atau password tidak tersedia"
                    }
                
                    return render(request, 'edit-user-admin.html', context)
                
                else:
                    context = {
                        'credential_form': forms.EditCredentialForm(instance=credential),
                        'employee_form': forms.EditEmployeeForm(instance=employee),
                        'days_form': forms.DaysForm(instance=days),
                        'message': "Gagal menyunting pengguna, pastikan data terisi dengan benar"
                    }
                
                    return render(request, 'edit-user-admin.html', context)
                    
                    
            else:
                context = {
                        'credential_form': forms.EditCredentialForm(instance=credential),
                        'employee_form': forms.EditEmployeeForm(instance=employee),
                        'days_form': forms.DaysForm(instance=days),
                    }
                return render(request, 'edit-user-admin.html', context)
            
            
    return render(request, 'users-admin.html')

@login_required
@staff_member_required
def add_user_bulk(request):
    with open(settings.MEDIA_ABS_PATH + '/foreign/user_absen_sija.csv') as users:
        users = csv.reader(users, delimiter=';')
        for user in users:
            User.objects.create(
                username=user[0],
                first_name=user[2],
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
            
    return render(request, 'bulk-add-users-admin.html')

@login_required
@staff_member_required
def undo_add_user_bulk(request):
    # Bulk Delete for emergency
    users = User.objects.filter(username__contains='smk')
    for user in users:
        user.delete()
            
    return render(request, 'undo-bulk-add-users-admin.html')

@login_required
@staff_member_required
def edit_password_admin(request):
    return render(request, 'edit-password-admin.html', context)
    
@login_required
@staff_member_required
def edit_role_admin(request):
    return render(request, 'edit-role-admin.html', context)