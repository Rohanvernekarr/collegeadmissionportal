from django.db import models

class Program(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    stream = models.CharField(max_length=100)
    level = models.CharField(max_length=50)
    eligibility = models.TextField()
    duration = models.CharField(max_length=50)
    fees = models.DecimalField(max_digits=12, decimal_places=2)
    intake_limit = models.PositiveIntegerField()

    def __str__(self):
        return self.name
