from rest_framework import serializers
from .models import Document

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'application', 'doc_type', 'file', 'uploaded_on']
        read_only_fields = ['id', 'uploaded_on']
