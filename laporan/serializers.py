from rest_framework import serializers
from laporan.models import ClassName, SubjectName, StudyReport, GuidanceReport, ScientificWorkReport, InnovativeWorkReport, HumanDevelopmentReport, DutyReport, SubjectCategory, ScientificWorkCategory, InnovativeWorkCategory, MajorRole
from absen.serializers import EmployeeSerializer
class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassName
        fields = '__all__'
        
class SubjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectCategory
        fields = '__all__'
class SubjectSerializers(serializers.ModelSerializer):
    class Meta:
        model = SubjectName
        fields = '__all__' 
        
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['class_name'] = ClassSerializer(instance.class_name).data
        ret['category'] = SubjectCategorySerializer(instance.category).data
        return ret
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
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['employee_id'] = EmployeeSerializer(instance.employee_id).data
        return data
        
class ScientificWorkCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ScientificWorkCategory
        fields = '__all__'
        

class ScientificWorkReportSerializers(serializers.ModelSerializer):
    class Meta:
        model = ScientificWorkReport
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['employee_id'] = EmployeeSerializer(instance.employee_id).data
        data['category'] = ScientificWorkCategorySerializer(instance.category).data
        return data
        
class InnovativeWorkCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = InnovativeWorkCategory
        fields = '__all__'
class InnovativeWorkReportSerializers(serializers.ModelSerializer):
    class Meta:
        model = InnovativeWorkReport
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['employee_id'] = EmployeeSerializer(instance.employee_id).data
        data['category'] = InnovativeWorkCategorySerializer(instance.category).data
        return data
        
class HumanDevelopmentReportSerializers(serializers.ModelSerializer):
    class Meta:
        model = HumanDevelopmentReport
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['employee_id'] = EmployeeSerializer(instance.employee_id).data
        return data
        
class MajorRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MajorRole
        fields = '__all__'
class DutyReportSerializers(serializers.ModelSerializer):
    class Meta:
        model = DutyReport
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['employee_id'] = EmployeeSerializer(instance.employee_id).data
        data['role'] = MajorRoleSerializer(instance.role).data
        return data