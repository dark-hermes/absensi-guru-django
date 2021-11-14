from laporan.models import SubjectName
from laporan.serializers import SubjectSerializers
from rest_framework import viewsets

class SubjectViewset(viewsets.ModelViewSet):
    serializer_class = SubjectSerializers
    
    queryset = SubjectName.objects.all()