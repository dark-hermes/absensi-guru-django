from django.db import models
from userauth.models import Employee


"""
This block is part of study report and its foreign key
"""
class ClassName(models.Model):
    class_name = models.CharField(max_length=50)
    def __str__(self):
        return self.class_name
    
class SubjectCategory(models.Model):
    category = models.CharField(max_length=16)
    def __str__(self):
        return self.category
        
class SubjectName(models.Model):
    class_name = models.ForeignKey(ClassName, on_delete=models.CASCADE)
    category = models.ForeignKey(SubjectCategory, on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=100)
    
class Method(models.Model):
    method_name = models.CharField(max_length=100)
    def __str__(self):
        return self.method_name

class StudyReport(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    class_name = models.ForeignKey(ClassName, on_delete=models.CASCADE)
    subject_category = models.CharField(max_length=16)
    subject_name = models.ForeignKey(SubjectName, on_delete=models.CASCADE)
    total_student = models.IntegerField()
    presence_student = models.IntegerField()
    absence_student = models.IntegerField()
    method = models.ForeignKey(Method, on_delete=models.CASCADE)
    documentation = models.FileField(upload_to='study_report/')
    desc = models.CharField(max_length=512, blank=True, null=True)
    
    
"""
Guidance Report
"""
class GuidanceReport(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    documentation = models.FileField(upload_to='guidance_report/')
    desc = models.TextField(blank=True, null=True, max_length=512)


"""
This block is part of scientific report and its foreign key
"""
class ScientificWorkCategory(models.Model):
    category_name = models.CharField(max_length=100)
    def __str__(self):
        return self.category_name
    
class ScientificWorkReport(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(ScientificWorkCategory, on_delete=models.CASCADE)
    documentation = models.FileField(upload_to='scientific_work_report/')
    desc = models.TextField(blank=True, null=True, max_length=512)
    
    
"""
This block is part of innovation report and its foreign key
"""
class InnovativeWorkCategory(models.Model):
    category_name = models.CharField(max_length=100)
    def __str__(self):
        return self.category_name
    
class InnovativeWorkReport(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(InnovativeWorkCategory, on_delete=models.CASCADE)
    documentation = models.FileField(upload_to='innovative_work_report/')
    desc = models.TextField(blank=True, null=True, max_length=512)
    
    
"""
This block is part of human development report and its foreign key
"""
class HumanDevelopmentCategory(models.Model):
    category_name = models.CharField(max_length=100)
    def __str__(self):
        return self.category_name
    
class HumanDevelopmentRole(models.Model):
    role_name = models.CharField(max_length=100)
    def __str__(self):
        return self.role_name
    
class HumanDevelopmentReport(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(HumanDevelopmentCategory, on_delete=models.CASCADE)
    role = models.ForeignKey(HumanDevelopmentRole, on_delete=models.CASCADE)
    duration = models.DecimalField(max_digits=2, decimal_places=2)
    documentation = models.FileField(upload_to='human_development_report/')
    desc = models.TextField(blank=True, null=True, max_length=512)
    
    
"""
This block is part of duty report and its foreign key
"""
class MajorRole(models.Model):
    role_name = models.CharField(max_length=100)
    def __str__(self):
        return self.role_name
    
class DutyReport(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    role = models.ForeignKey(MajorRole, on_delete=models.CASCADE)
    documentation = models.FileField(upload_to='duty_report/')
    desc = models.TextField(blank=True, null=True, max_length=512)