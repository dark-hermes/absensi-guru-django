from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User, Group
from userauth.models import Employee, Days
from django import forms
class CredentialForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["username", "password1", "password2"]
        labels = {
            'username': 'Username',
            'password1': 'Password',
            'password2': 'Confirm Password'
        }
        
class EmployeeForm(forms.ModelForm):
    
    CHOICES = [
        ('admin', 'Admin'),
        ('supervisor', 'Supervisor'),
        ('user', 'User')
    ]
    
    group = forms.ChoiceField(choices=CHOICES, widget=forms.RadioSelect, label='')
    
    class Meta:
        model = Employee
        fields = ["full_name", "nip", 'position', "group"]
        labels = {
            "full_name": "Nama Lengkap",
            "nip": "NIP",
            "position": "Posisi",
            "group": "Role",
        }
        
class DaysForm(forms.ModelForm):
    class Meta:
        model = Days
        fields = ["monday", "tuesday", "wednesday", "thursday", "friday"]
        labels = {
            "monday": "Senin",
            "tuesday": "Selasa",
            "wednesday": "Rabu",
            "thursday": "Kamis",
            "friday": "Jumat"
        }
