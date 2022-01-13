from laporan.models import ClassName, SubjectName, StudyReport, GuidanceReport, ScientificWorkReport, InnovativeWorkReport, HumanDevelopmentReport, DutyReport
from laporan.serializers import ClassSerializer,SubjectSerializers, StudyReportSerializer,GuidanceReportSerializers, ScientificWorkReportSerializers, InnovativeWorkReportSerializers, HumanDevelopmentReportSerializers, DutyReportSerializers
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class ClassViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ClassSerializer
    queryset = ClassName.objects.all()
    
    def _allowed_methods(self):
        return [m for m in super(ClassViewset, self)._allowed_methods() if m not in ['DELETE', 'POST']]
    
class SubjectViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    
    def _allowed_methods(self):
        return [m for m in super(SubjectViewset, self)._allowed_methods() if m not in ['DELETE', 'POST']]
    serializer_class = SubjectSerializers
    
    queryset = SubjectName.objects.all()
    
    
class StudyReportViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = StudyReportSerializer
    
    def _allowed_methods(self):
        return [m for m in super(StudyReportViewset, self)._allowed_methods() if m not in ['DELETE', 'POST']]
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return StudyReport.objects.filter(employee_id__user=user).order_by('-created_at')
        else:
            return StudyReport.objects.all().order_by('-created_at')

class GuidanceReportViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = GuidanceReportSerializers
    
    def _allowed_methods(self):
        return [m for m in super(GuidanceReportViewset, self)._allowed_methods() if m not in ['DELETE', 'POST']]
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return GuidanceReport.objects.filter(employee_id__user=user).order_by('-created_at')
        else:
            return GuidanceReport.objects.all().order_by('-created_at')
    
class ScientificWorkReportViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ScientificWorkReportSerializers
    
    def _allowed_methods(self):
        return [m for m in super(ScientificWorkReportViewset, self)._allowed_methods() if m not in ['DELETE', 'POST']]
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return ScientificWorkReport.objects.filter(employee_id__user=user).order_by('-created_at')
        else:
            return ScientificWorkReport.objects.all().order_by('-created_at')
    
class InnovativeWorkReportViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = InnovativeWorkReportSerializers
    
    def _allowed_methods(self):
        return [m for m in super(InnovativeWorkReportViewset, self)._allowed_methods() if m not in ['DELETE', 'POST']]
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return InnovativeWorkReport.objects.filter(employee_id__user=user).order_by('-created_at')
        else:
            return InnovativeWorkReport.objects.all().order_by('-created_at')
    
class HumanDevelopmentReportViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = HumanDevelopmentReportSerializers
    
    def _allowed_methods(self):
        return [m for m in super(HumanDevelopmentReportViewset, self)._allowed_methods() if m not in ['DELETE', 'POST']]
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return HumanDevelopmentReport.objects.filter(employee_id__user=user).order_by('-created_at')
        else:
            return HumanDevelopmentReport.objects.all().order_by('-created_at')
    
class DutyReportViewset(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = DutyReportSerializers
    
    def _allowed_methods(self):
        return [m for m in super(DutyReportViewset, self)._allowed_methods() if m not in ['DELETE', 'POST']]
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff != True:
            return DutyReport.objects.filter(employee_id__user=user).order_by('-created_at')
        else:
            return DutyReport.objects.all().order_by('-created_at')