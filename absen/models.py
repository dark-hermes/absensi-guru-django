from django.db import models
from userauth.models import Employee
    
class Presence(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    presence_date = models.DateField(blank=True)
    checkin_time = models.TimeField(blank=True, null=True)
    checkout_time = models.TimeField(blank=True, null=True)
    checkin_desc = models.CharField(max_length=10, blank=True, null=True)
    checkout_desc = models.CharField(max_length=10, blank=True, null=True)
    checkin_img = models.ImageField(upload_to='checkin/', blank=True, null=True)
    checkout_img = models.ImageField(upload_to='checkout/', blank=True, null=True)
    
class CheckinRecord(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    time = models.DateTimeField(blank=True, null=True)
    is_checked = models.BooleanField(default=False)
    
class CheckoutRecord(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    time = models.DateTimeField(blank=True, null=True)
    is_checked = models.BooleanField(default=False)
    
