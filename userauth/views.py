from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from absensi_guru import forms
from django.contrib.auth.models import Group, User
from django.contrib.auth.views import LoginView
from userauth.models import Days, Employee

# def add_user(request):
#     if request.POST:
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             messages.success(request, "User berhasil dibuat")
#             return redirect('add-user')
#         else:
#             messages.error(request, "Terjadi kesalahan")
#             return redirect('add-user')
    
#     else:
#         form = UserCreationForm()
#         context  ={
#             'form': form,
#         }
        
#     return render(request, 'add-user.html', context)

def add_user(request):
    if request.method == 'POST':
        credential_form = forms.CredentialForm(request.POST)
        employee_form = forms.EmployeeForm(request.POST)
        days_form = forms.DaysForm(request.POST)
        
        if credential_form.is_valid() and employee_form.is_valid() and days_form.is_valid():
            credential_form_f = credential_form.save(commit=False)
            credential_form_f.first_name = request.POST.get('full_name').split()[0]
            if request.POST.get('group') == "admin":
                credential_form_f.is_staff = True
                credential_form.is_superuser = True
            credential_form_f.save()
            
            employee_form_f = employee_form.save(commit=False)
            employee_form_f.user_id = User.objects.latest('id').id
            employee_form_f.save()
            
            days_form_f = days_form.save(commit=False)
            days_form_f.employee_id = Employee.objects.latest('id')
            days_form_f.save()
            
            group = Group.objects.get(name=request.POST.get('group'))
            group.user_set.add(User.objects.latest('id'))
            
            credential_form = forms.CredentialForm()
            employee_form = forms.EmployeeForm()
            days_form = forms.DaysForm()
            
            
            message = "Berhasil menambahkan pengguna"
            context = {
                'credential_form': credential_form,
                'employee_form': employee_form,
                'days_form': days_form,
                'message': message,
            }
            
            return render(request, 'add-user.html', context)
        
        elif not credential_form.is_valid():
            context = {
                'credential_form': forms.CredentialForm(),
                'employee_form': forms.EmployeeForm(),
                'days_form': forms.DaysForm(),
                'message': "Gagal menambah pengguna, username atau password tidak tersedia"
            }
        
            return render(request, 'add-user.html', context)
        
        else:
            context = {
                'credential_form': forms.CredentialForm(),
                'employee_form': forms.EmployeeForm(),
                'days_form': forms.DaysForm(),
                'message': "Gagal menambah pengguna, pastikan data terisi dengan benar"
            }
        
            return render(request, 'add-user.html', context)
            
            
    else:
        context = {
                'credential_form': forms.CredentialForm(),
                'employee_form': forms.EmployeeForm(),
                'days_form': forms.DaysForm(),
            }
        
        return render(request, 'add-user.html', context)
    
def delete_user(request, id_user):
    user = User.objects.get(employee__id=id_user)
    user.delete()
    
    return redirect('index')
            
