from rest_framework import viewsets, permissions
from .models import Document
from .serializers import DocumentSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'applicant':
            return Document.objects.filter(application__applicant__user=user)
        elif user.role in ['officer', 'admin']:
            return Document.objects.all()
        return Document.objects.none()
