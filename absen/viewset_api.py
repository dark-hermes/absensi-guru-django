from absen.models import Presence
from absen.serializers import PresenceSerializer
from rest_framework import viewsets

class PresenceViewset(viewsets.ModelViewSet):
    serializer_class = PresenceSerializer
    
    def get_queryset(self):
        """
        This view should return a list of all the presence records
        for the currently authenticated user.
        """
        user = self.request.user
        return Presence.objects.filter(employee_id__user=user)