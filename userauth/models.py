from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    nip = models.CharField(max_length=18, null=True, blank=True)
    full_name = models.CharField(max_length=255,null=True)
    position = models.CharField(max_length=100,null=True)
    # photo = models.ImageField(upload_to='profile/', null=True)
    

class Days(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE, null=True, blank=True)
    monday = models.BooleanField(default=False)
    tuesday = models.BooleanField(default=False)
    wednesday = models.BooleanField(default=False)
    thursday = models.BooleanField(default=False)
    friday = models.BooleanField(default=False)