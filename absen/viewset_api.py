from absen.models import Presence
from absen.serializers import PresenceSerializer
from rest_framework import viewsets

class PresenceViewset(viewsets.ModelViewSet):
    queryset = Presence.objects.all()
    serializer_class = PresenceSerializer