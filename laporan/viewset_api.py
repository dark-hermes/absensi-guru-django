from laporan.models import SubjectName, StudyReport, GuidanceReport, ScientificWorkReport, InnovativeWorkReport, HumanDevelopmentReport, DutyReport
from laporan.serializers import SubjectSerializers, StudyReportSerializer,GuidanceReportSerializers, ScientificWorkReportSerializers, InnovativeWorkReportSerializers, HumanDevelopmentReportSerializers, DutyReportSerializers
from rest_framework import viewsets

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
        return StudyReport.objects.filter(employee_id__user=user)   
class GuidanceReportViewset(viewsets.ModelViewSet):
    serializer_class = GuidanceReportSerializers
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        return GuidanceReport.objects.filter(employee_id__user=user)
    
class ScientificWorkReportViewset(viewsets.ModelViewSet):
    serializer_class = ScientificWorkReportSerializers
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        return ScientificWorkReport.objects.filter(employee_id__user=user)
    
class InnovativeWorkReportViewset(viewsets.ModelViewSet):
    serializer_class = InnovativeWorkReportSerializers
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        return InnovativeWorkReport.objects.filter(employee_id__user=user)
    
class HumanDevelopmentReportViewset(viewsets.ModelViewSet):
    serializer_class = HumanDevelopmentReportSerializers
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        return HumanDevelopmentReport.objects.filter(employee_id__user=user)
    
class DutyReportViewset(viewsets.ModelViewSet):
    serializer_class = DutyReportSerializers
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        return DutyReport.objects.filter(employee_id__user=user)