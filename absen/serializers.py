from rest_framework import serializers
from absen.models import Presence, CheckoutRecord, CheckinRecord

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
        