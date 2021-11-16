from absen.models import Presence, CheckoutRecord, CheckinRecord
from absen.serializers import PresenceSerializer, CheckoutSerializer, CheckinSerializer
from rest_framework import viewsets

class PresenceViewset(viewsets.ModelViewSet):
    serializer_class = PresenceSerializer
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        return Presence.objects.filter(employee_id__user=user)
    
class CheckinViewset(viewsets.ModelViewSet):
    serializer_class = CheckinSerializer
    
    
    def get_queryset(self):
        user = self.request.user
        return CheckinRecord.objects.filter(employee_id__user=user)
    
class CheckoutViewset(viewsets.ModelViewSet):
    serializer_class = CheckoutSerializer
    
    def get_queryset(self):
        user = self.request.user
        return CheckinRecord.objects.filter(employee_id__user=user)
    
    
    