from django.contrib import admin
from . import models


class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'email', 'feedback', 'data')
    list_display_links = ('data', 'feedback')

admin.site.register(models.Feedback, FeedbackAdmin)
