from django.db import models
from django.conf import settings
from courses.models import Program

class ApplicantProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applicant_profile')
    full_name = models.CharField(max_length=255)
    dob = models.DateField()
    phone = models.CharField(max_length=20)
    address = models.TextField()

    def __str__(self):
        return self.full_name

class Application(models.Model):
    STATUS_CHOICES = [
        ('submitted', 'Submitted'),
        ('under_review', 'Under Review'),
        ('shortlisted', 'Shortlisted'),
        ('admitted', 'Admitted'),
        ('rejected', 'Rejected'),
        ('waitlisted', 'Waitlisted'),
    ]
    applicant = models.ForeignKey(ApplicantProfile, on_delete=models.CASCADE, related_name='applications')
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='submitted')
    submitted_on = models.DateTimeField(auto_now_add=True)
    review_notes = models.TextField(blank=True)
    reviewed_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='reviewed_applications')

    def __str__(self):
        return f"{self.applicant.full_name} - {self.program.name}"
