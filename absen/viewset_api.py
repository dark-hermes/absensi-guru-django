from absen.models import Presence, CheckoutRecord, CheckinRecord
from absen.serializers import PresenceSerializer, CheckoutSerializer, CheckinSerializer, DaysSerializer, EmployeeSerializer
from userauth.models import Days, Employee
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class PresenceViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = PresenceSerializer
    
    def _allowed_methods(self):
        return [m for m in super(PresenceViewset, self)._allowed_methods() if m not in ['DELETE', 'POST']]
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return Presence.objects.filter(employee_id__user=user).order_by('-presence_date')
        else:
            return Presence.objects.all().order_by('-presence_date', '-checkin_time', '-checkout_time')
    
class CheckinViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CheckinSerializer
    
    def _allowed_methods(self):
        return [m for m in super(CheckinViewset, self)._allowed_methods() if m not in ['DELETE', 'POST']]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff != True:
            return CheckinRecord.objects.filter(employee_id__user=user)
        else:
            return CheckinRecord.objects.all()
    
class CheckoutViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CheckoutSerializer
    
    def _allowed_methods(self):
        return [m for m in super(CheckoutViewset, self)._allowed_methods() if m not in ['DELETE', 'POST']]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff != True:
            return CheckoutRecord.objects.filter(employee_id__user=user)
        else:
            return CheckoutRecord.objects.all()
    
class DaysViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = DaysSerializer
    
    def _allowed_methods(self):
        return [m for m in super(DaysViewset, self)._allowed_methods() if m not in ['DELETE', 'POST']]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff != True:
            return Days.objects.filter(employee_id__user=user)
        else:
            return Days.objects.all()
    
class EmployeeViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    
    serializer_class = EmployeeSerializer
    
    def _allowed_methods(self):
        return [m for m in super(EmployeeViewset, self)._allowed_methods() if m not in ['DELETE','POST']]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff != True:
            return Employee.objects.filter(user_id=user)
        else:
            return Employee.objects.all().order_by('-position', 'full_name')
    
    