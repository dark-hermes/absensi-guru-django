from django import forms
from laporan.models import *

class StudyForm(forms.ModelForm):
    class Meta:
        model = StudyReport
        fields = '__all__'
    
        widgets = {
            'employee_id': forms.TextInput(attrs={'class':'form-control', 'id':'floatingInput', 'readonly':True}),
            'total_student': forms.NumberInput(attrs={'class':'form-control', 'id':'floatingInput', 'placeholder':'Jumlah siswa'}),
            'presence_student': forms.NumberInput(attrs={'class':'form-control', 'id':'floatingInput', 'placeholder':'Jumlah siswa hadir'}),
            'absence_student': forms.NumberInput(attrs={'class':'form-control', 'id':'floatingInput', 'placeholder':'Jumlah siswa tidak hadir'}),
            'desc': forms.Textarea(attrs={'class':'form-control', 'id':'floatingTextArea2', 'placeholder':'Deskripsi'}),
            'documentation': forms.FileInput(attrs={'class':'form-control', 'id':'formFileMultiple', 'placeholder':'Dokumentasi', 'multiple':True}),
        }
        
    def __init__(self, *args, **kwargs):
        super(StudyForm, self).__init__(*args, **kwargs)
        self.fields['class_name'] = forms.ModelChoiceField(queryset=ClassName.objects.all().order_by('class_name'), empty_label="Pilih Kelas", to_field_name="class_name",  widget=forms.Select(attrs={'class':'form-select form-select-lg', "aria-label":".form-select-md example"}))
        self.fields['subject_category'] = forms.ModelChoiceField(queryset=SubjectCategory.objects.all(), empty_label="Pilih Jenis Mapel", to_field_name="id",  widget=forms.Select(attrs={'class':'form-select form-select-lg', "aria-label":".form-select-md example"}))
        self.fields['subject_name'] = forms.ModelChoiceField(queryset=SubjectName.objects.values_list('subject_name', flat=True).order_by('subject_name'), empty_label="Pilih Mata Pelajaran",  widget=forms.Select(attrs={'class':'form-select form-select-lg', "aria-label":".form-select-md example"}))
        
        
class GuidanceForm(forms.ModelForm):
    class Meta:
        model = GuidanceReport
        fields = '__all__'
    
        widgets = {
            'employee_id': forms.TextInput(attrs={'class':'form-control', 'id':'floatingInput', 'readonly':True}),
            'desc': forms.Textarea(attrs={'class':'laporan', 'id':'laporan', 'placeholder':'Ketikkan laporan di sini'}),
            'documentation': forms.FileInput(attrs={'class':'form-control', 'id':'formFileMultiple', 'placeholder':'Dokumentasi'})
        }
        

class ScientificWorkForm(forms.ModelForm):
    class Meta:
        model = ScientificWorkReport
        fields = '__all__'
        
        widgets  = {
            'employee_id': forms.TextInput(attrs={'class':'form-control', 'id':'floatingInput', 'readonly':True}),
            'desc': forms.Textarea(attrs={'class':'laporan', 'id':'laporan', 'placeholder':'Ketikkan laporan di sini'}),
            'documentation': forms.FileInput(attrs={'class':'form-control', 'id':'formFileMultiple', 'placeholder':'Dokumentasi'})
        }
        
    def __init__(self, *args, **kwargs):
        super(ScientificWorkForm, self).__init__(*args, **kwargs)
        self.fields['category'] = forms.ModelChoiceField(queryset=ScientificWorkCategory.objects.all().order_by('category_name'),to_field_name="id", widget=forms.Select(attrs={'class':'form-select form-select-lg', "aria-label":".form-select-md example"}))
        

class InnovativeWorkForm(forms.ModelForm):
    class Meta:
        model = InnovativeWorkReport
        fields = '__all__'
        
        widgets  = {
            'employee_id': forms.TextInput(attrs={'class':'form-control', 'id':'floatingInput', 'readonly':True}),
            'desc': forms.Textarea(attrs={'class':'laporan', 'id':'laporan', 'placeholder':'Ketikkan laporan di sini'}),
            'documentation': forms.FileInput(attrs={'class':'form-control', 'id':'formFileMultiple', 'placeholder':'Dokumentasi'})
        }
        
    def __init__(self, *args, **kwargs):
        super(InnovativeWorkForm, self).__init__(*args, **kwargs)
        self.fields['category'] = forms.ModelChoiceField(queryset=InnovativeWorkCategory.objects.all().order_by('category_name'),to_field_name="id", widget=forms.Select(attrs={'class':'form-select form-select-lg', "aria-label":".form-select-md example"}))
        

class HumanDevelopmentForm(forms.ModelForm):
    pass


class DutyForm(forms.ModelForm):
    class Meta:
        model = DutyReport
        fields = '__all__'
        
        widgets  = {
            'employee_id': forms.TextInput(attrs={'class':'form-control', 'id':'floatingInput', 'readonly':True}),
            'desc': forms.Textarea(attrs={'class':'laporan', 'id':'laporan', 'placeholder':'Ketikkan laporan di sini'}),
            'documentation': forms.FileInput(attrs={'class':'form-control', 'id':'formFileMultiple', 'placeholder':'Dokumentasi'})
        }
        
    def __init__(self, *args, **kwargs):
        super(DutyForm, self).__init__(*args, **kwargs)
        self.fields['role'] = forms.ModelChoiceField(queryset=MajorRole.objects.all().order_by('role_name'),to_field_name="id", widget=forms.Select(attrs={'class':'form-select form-select-lg', "aria-label":".form-select-md example"}))