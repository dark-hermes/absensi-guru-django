from absen.models import Presence, CheckoutRecord, CheckinRecord
from absen.serializers import PresenceSerializer, CheckoutSerializer, CheckinSerializer, DaysSerializer
from userauth.models import Days
from rest_framework import viewsets

class PresenceViewset(viewsets.ModelViewSet):
    serializer_class = PresenceSerializer
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return Presence.objects.filter(employee_id__user=user)
        else:
            return Presence.objects.all()
    
class CheckinViewset(viewsets.ModelViewSet):
    serializer_class = CheckinSerializer
    
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff != True:
            return CheckinRecord.objects.filter(employee_id__user=user)
        else:
            return CheckinRecord.objects.all()
    
class CheckoutViewset(viewsets.ModelViewSet):
    serializer_class = CheckoutSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff != True:
            return CheckoutRecord.objects.filter(employee_id__user=user)
        else:
            return CheckoutRecord.objects.all()
    
class DaysViewset(viewsets.ModelViewSet):
    serializer_class = DaysSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff != True:
            return Days.objects.filter(employee_id__user=user)
        else:
            return Days.objects.all()
    
    
    