from rest_framework import serializers
from .models import ApplicantProfile, Application
from courses.serializers import ProgramSerializer
from courses.models import Program 

class ApplicantProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicantProfile
        fields = '__all__'
        read_only_fields = ['user']

class ApplicationSerializer(serializers.ModelSerializer):
    program = ProgramSerializer(read_only=True)
    program_id = serializers.PrimaryKeyRelatedField(queryset=Program.objects.all(), source='program', write_only=True)

    class Meta:
        model = Application
        fields = ['id', 'applicant', 'program', 'program_id', 'status', 'submitted_on', 'review_notes', 'reviewed_by']
        read_only_fields = ['id', 'applicant', 'status', 'submitted_on', 'review_notes', 'reviewed_by']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Only override queryset if program_queryset is provided in context
        if self.context.get('program_queryset') is not None:
            self.fields['program_id'].queryset = self.context['program_queryset']

    def create(self, validated_data):
        user = self.context['request'].user
        applicant_profile = user.applicant_profile
        program = validated_data.pop('program')
        application = Application.objects.create(applicant=applicant_profile, program=program, **validated_data)
        return application