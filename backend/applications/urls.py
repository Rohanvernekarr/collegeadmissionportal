from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ApplicantProfileViewSet, ApplicationViewSet

router = DefaultRouter()
router.register('profile', ApplicantProfileViewSet, basename='applicant-profile')
router.register('applications', ApplicationViewSet, basename='applications')

urlpatterns = [
    path('', include(router.urls)),
]
