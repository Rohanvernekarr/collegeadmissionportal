from django.db import models
from applications.models import Application

class Document(models.Model):
    DOC_TYPES = [
        ('transcript', 'Transcript'),
        ('certificate', 'Certificate'),
        ('id_proof', 'ID Proof'),
    ]
    application = models.ForeignKey(Application, related_name='documents', on_delete=models.CASCADE)
    doc_type = models.CharField(max_length=50, choices=DOC_TYPES)
    file = models.FileField(upload_to='documents/')
    uploaded_on = models.DateTimeField(auto_now_add=True)
