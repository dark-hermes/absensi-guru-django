from django.db import models

class Employee(models.Model):
    username = models.CharField(max_length=50)
    name = models.CharField(max_length=255)
    nip = models.CharField(max_length=18, null=True, blank=True)
    password = models.CharField(max_length=255)
    
class Role(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    role = models.CharField(max_length=20)
    
class Days(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    monday = models.BooleanField(default=False)
    tuesday = models.BooleanField(default=False)
    wednesday = models.BooleanField(default=False)
    thursday = models.BooleanField(default=False)
    friday = models.BooleanField(default=False)
    saturday = models.BooleanField(default=False)
    sunday = models.BooleanField(default=False)
    
class Presence(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    presence_date = models.DateField(blank=True)
    checkin_time = models.TimeField(blank=True)
    checkout_time = models.TimeField(blank=True)
    checkin_desc = models.CharField(max_length=10)
    checkout_desc = models.CharField(max_length=10)
    checkin_img = models.ImageField(upload_to='checkin/')
    checkout_img = models.ImageField(upload_to='checkout/')
    
class CheckinRecord(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    is_checked = models.BooleanField(default=False)
    
class CheckoutRecord(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    is_checked = models.BooleanField(default=False)
    
class TempImage(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    tmp_image = models.ImageField(upload_to='tmp/')