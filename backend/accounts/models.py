from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ADMIN = 'admin'
    OFFICER = 'officer'
    APPLICANT = 'applicant'

    ROLE_CHOICES = [
        (ADMIN, 'Admin'),
        (OFFICER, 'Admission Officer'),
        (APPLICANT, 'Applicant'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=APPLICANT)

    def __str__(self):
        return f"{self.username} ({self.role})"
