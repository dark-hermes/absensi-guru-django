from rest_framework import serializers
from absen.models import Presence, CheckoutRecord, CheckinRecord
from userauth.models import Days, Employee

class PresenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Presence
        fields = '__all__'
        
class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckoutRecord
        fields = '__all__'
        
class CheckinSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckinRecord
        fields = '__all__'
        
class DaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Days
        fields = '__all__'
        
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'