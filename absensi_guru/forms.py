from django.forms import ModelForm, widgets
from django import forms
from userauth.models import Employee

class AddUser(ModelForm):
    class Meta:
        model = Employee
        fields = '__all__'
        
        # widgets = {
        #     'judul': forms.TextInput({'class':'form-control'}),
        #     'penulis': forms.TextInput({'class':'form-control'}),
        #     'penerbit': forms.TextInput({'class':'form-control'}),
        #     'jumlah': forms.NumberInput({'class':'form-control'}),
        #     'kelompok_id': forms.Select({'class':'form-control'}),
        # }