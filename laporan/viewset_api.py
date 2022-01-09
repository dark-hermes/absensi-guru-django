from laporan.models import ClassName, SubjectName, StudyReport, GuidanceReport, ScientificWorkReport, InnovativeWorkReport, HumanDevelopmentReport, DutyReport
from laporan.serializers import ClassSerializer,SubjectSerializers, StudyReportSerializer,GuidanceReportSerializers, ScientificWorkReportSerializers, InnovativeWorkReportSerializers, HumanDevelopmentReportSerializers, DutyReportSerializers
from rest_framework import viewsets


class ClassViewset(viewsets.ModelViewSet):
    serializer_class = ClassSerializer
    queryset = ClassName.objects.all()
    
class SubjectViewset(viewsets.ModelViewSet):
    serializer_class = SubjectSerializers
    
    queryset = SubjectName.objects.all()
    
    
class StudyReportViewset(viewsets.ModelViewSet):
    serializer_class = StudyReportSerializer
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return StudyReport.objects.filter(employee_id__user=user)
        else:
            return StudyReport.objects.all()

class GuidanceReportViewset(viewsets.ModelViewSet):
    serializer_class = GuidanceReportSerializers
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return GuidanceReport.objects.filter(employee_id__user=user)
        else:
            return GuidanceReport.objects.all()
    
class ScientificWorkReportViewset(viewsets.ModelViewSet):
    serializer_class = ScientificWorkReportSerializers
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return ScientificWorkReport.objects.filter(employee_id__user=user)
        else:
            return ScientificWorkReport.objects.all()
    
class InnovativeWorkReportViewset(viewsets.ModelViewSet):
    serializer_class = InnovativeWorkReportSerializers
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return InnovativeWorkReport.objects.filter(employee_id__user=user)
        else:
            return InnovativeWorkReport.objects.all()
    
class HumanDevelopmentReportViewset(viewsets.ModelViewSet):
    serializer_class = HumanDevelopmentReportSerializers
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return HumanDevelopmentReport.objects.filter(employee_id__user=user)
        else:
            return HumanDevelopmentReport.objects.all()
    
class DutyReportViewset(viewsets.ModelViewSet):
    serializer_class = DutyReportSerializers
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return DutyReport.objects.filter(employee_id__user=user)
        else:
            return DutyReport.objects.all()