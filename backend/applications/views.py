from rest_framework import viewsets, permissions
from .models import ApplicantProfile, Application
from .serializers import ApplicantProfileSerializer, ApplicationSerializer
from courses.models import Program
from rest_framework.decorators import action
from rest_framework.response import Response

class ApplicantProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicantProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ApplicantProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'applicant':
            return Application.objects.filter(applicant__user=user)
        elif user.role in ['officer', 'admin']:
            return Application.objects.all()
        else:
            return Application.objects.none()

    def get_serializer_context(self):
        return super().get_serializer_context() | {'program_queryset': Program.objects.all(), 'request': self.request}

    @action(detail=True, methods=['post'])
    def review(self, request, pk=None):
        if request.user.role not in ('officer', 'admin'):
            return Response({"detail": "Not authorized"}, status=403)
        application = self.get_object()
        status = request.data.get('status')
        notes = request.data.get('review_notes', '')
        if status not in dict(Application.STATUS_CHOICES):
            return Response({"detail": "Invalid status"}, status=400)
        application.status = status
        application.review_notes = notes
        application.reviewed_by = request.user
        application.save()
        serializer = self.get_serializer(application)
        return Response(serializer.data)
