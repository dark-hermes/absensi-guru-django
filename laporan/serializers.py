from rest_framework import serializers
from laporan.models import SubjectName, GuidanceReport, ScientificWorkReport, InnovativeWorkReport, HumanDevelopmentReport, DutyReport

class SubjectSerializers(serializers.ModelSerializer):
    class Meta:
        model = SubjectName
        fields = '__all__'
        
class GuidanceReportSerializers(serializers.ModelSerializer):
    class Meta:
        model = GuidanceReport
        fields = '__all__'
        
class ScientificWorkReportSerializers(serializers.ModelSerializer):
    class Meta:
        model = ScientificWorkReport
        fields = '__all__'
        
class InnovativeWorkReportSerializers(serializers.ModelSerializer):
    class Meta:
        model = InnovativeWorkReport
        fields = '__all__'
        
class HumanDevelopmentReportSerializers(serializers.ModelSerializer):
    class Meta:
        model = HumanDevelopmentReport
        fields = '__all__'
        
class DutyReportSerializers(serializers.ModelSerializer):
    class Meta:
        model = DutyReport
        fields = '__all__'