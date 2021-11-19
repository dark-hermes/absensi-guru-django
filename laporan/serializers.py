from rest_framework import serializers
from laporan.models import ClassName, SubjectName, StudyReport, GuidanceReport, ScientificWorkReport, InnovativeWorkReport, HumanDevelopmentReport, DutyReport

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassName
        fields = '__all__'
class SubjectSerializers(serializers.ModelSerializer):
    class Meta:
        model = SubjectName
        fields = '__all__' 
class StudyReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyReport
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['class_name'] = ClassSerializer(instance.class_name).data
        data['subject_name'] = SubjectSerializers(instance.subject_name).data
        return data
    
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