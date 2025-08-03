from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import DocumentViewSet

router = DefaultRouter()
router.register('', DocumentViewSet, basename="documents")

urlpatterns = [
    path('', include(router.urls)),
]
