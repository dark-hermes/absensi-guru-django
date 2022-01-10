from rest_framework import serializers
from absen.models import Presence, CheckoutRecord, CheckinRecord
from userauth.models import Days, Employee
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'
class PresenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Presence
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['employee_id'] = EmployeeSerializer(instance.employee_id).data
        return data
        
class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckoutRecord
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['employee_id'] = EmployeeSerializer(instance.employee_id).data
        return data
        
class CheckinSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckinRecord
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['employee_id'] = EmployeeSerializer(instance.employee_id).data
        return data
        
class DaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Days
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['employee_id'] = EmployeeSerializer(instance.employee_id).data
        return data
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = UserSerializer(instance.user).data
        return data