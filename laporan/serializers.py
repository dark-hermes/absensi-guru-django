from rest_framework import serializers
from laporan.models import SubjectName

class SubjectSerializers(serializers.ModelSerializer):
    class Meta:
        model = SubjectName
        fields = '__all__'
        