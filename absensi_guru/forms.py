from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User, Group
from userauth.models import Employee, Days
from django import forms 
from django.contrib.auth import get_user_model
class CredentialForm(UserCreationForm):
    class Meta:
        model = get_user_model()
        fields = ["username", "password1", "password2"]
        # labels = {
        #     'username': 'Username',
        #     'password1': 'Password',
        #     'password2': 'Konfirmasi Password'
        # }
        
        # widgets = {
        #     "username":forms.TextInput(attrs={'class':'form-control', 'id':'floating-username', 'placeholder':'hermawan123', 'name':'username', 'required': True}),
        #     'password1': forms.PasswordInput(attrs={'class':'form-control'}),
        #     'password2': forms.PasswordInput(attrs={'class':'form-control', 'id':'floating-password-confirm', 'placeholder':'********', 'name':'password-confirm', 'required': True})
        # }
        
        # def __init__(self, *args, **kwargs):
        #     super(CredentialForm, self).__init__(*args, **kwargs)
            # self.fields['password1'] = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control', 'autocomplete':'new-password', 'required':True, 'id':'id_password1'}))
        
    username = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control', 'id':'floating-username', 'placeholder':'hermawan123', 'name':'username', 'required': True}))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control', "placeholder":'***********', 'autocomplete':'new-password', 'required':True, 'id':'floating-password'}))
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control', "placeholder":'***********', 'autocomplete':'new-password', 'required':True, 'id':'floating-password-confirm'}))
    
class EditCredentialForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ["username"]
        
    username = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control', 'id':'floating-username', 'placeholder':'hermawan123', 'name':'username', 'required': True}))

        
class EmployeeForm(forms.ModelForm):
    
    group = forms.ModelChoiceField(queryset=Group.objects.all(), label='',empty_label='Pilih Role*', to_field_name="name", widget=forms.Select(attrs={'class':'form-control', 'id':'floating-group', 'name':'group', 'required': True}))
    class Meta:
        model = Employee
        fields = ["full_name", "nip", 'position', "group"]
        labels = {
            "full_name": "Nama Lengkap",
            "nip": "NIP",
            "position": "Posisi",
            "group": "Role",
        }
        widgets = {
            'full_name': forms.TextInput(attrs={'class': 'form-control', 'id':'floating-name', 'placeholder':'Hermawan Fanreza', 'name':'fullname', 'required': True}),
            'nip': forms.TextInput(attrs={'class': 'form-control', 'id':'floating-nip', 'placeholder':'123456789', 'name':'nip'}),
            'position': forms.TextInput(attrs={'class': 'form-control', 'id':'floating-posisi', 'placeholder':'Guru Matematika', 'name':'position', 'required': True}),
        }
        
class EditEmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        fields = ["full_name", "nip", 'position']
        labels = {
            "full_name": "Nama Lengkap",
            "nip": "NIP",
            "position": "Posisi",
        }
        widgets = {
            'full_name': forms.TextInput(attrs={'class': 'form-control', 'id':'floating-name', 'placeholder':'Hermawan Fanreza', 'name':'fullname', 'required': True}),
            'nip': forms.TextInput(attrs={'class': 'form-control', 'id':'floating-nip', 'placeholder':'123456789', 'name':'nip'}),
            'position': forms.TextInput(attrs={'class': 'form-control', 'id':'floating-posisi', 'placeholder':'Guru Matematika', 'name':'position', 'required': True}),
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
        
        widgets = {
            'monday': forms.CheckboxInput(attrs={'class': 'form-check-input', 'id': 'id_monday', 'name':'monday'}),
            'tuesday': forms.CheckboxInput(attrs={'class': 'form-check-input', 'id': 'id_tuesday', 'name':'tuesday'}),
            'wednesday': forms.CheckboxInput(attrs={'class': 'form-check-input', 'id': 'id_wednesday', 'name':'wednesday'}),
            'thursday': forms.CheckboxInput(attrs={'class': 'form-check-input', 'id': 'id_thursday', 'name':'thursday'}),
            'friday': forms.CheckboxInput(attrs={'class': 'form-check-input', 'id': 'id_friday', 'name':'friday'}),
        }
