from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    nip = models.CharField(max_length=18, null=True, blank=True)
    full_name = models.CharField(max_length=255,null=True)
    
    def __str__(self):
        return self.user.last_name