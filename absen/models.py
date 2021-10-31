from django.db import models
from userauth.models import Employee
    
class Presence(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    presence_date = models.DateField(blank=True)
    checkin_time = models.TimeField(blank=True)
    checkout_time = models.TimeField(blank=True)
    checkin_desc = models.CharField(max_length=10, blank=True)
    checkout_desc = models.CharField(max_length=10, blank=True)
    checkin_img = models.ImageField(upload_to='checkin/', blank=True)
    checkout_img = models.ImageField(upload_to='checkout/', blank=True)
    
class CheckinRecord(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    is_checked = models.BooleanField(default=False)
    
class CheckoutRecord(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    is_checked = models.BooleanField(default=False)
    
class TempImage(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE, null=True, blank=True)
    time = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    tmp_image = models.ImageField(upload_to='tmp/')
    
