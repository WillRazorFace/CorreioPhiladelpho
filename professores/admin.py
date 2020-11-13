from django.contrib import admin
from . import models


class ProfessorAdmin(admin.ModelAdmin):
    list_display = ('usuario',)
    list_display_links = ('usuario',)
    search_fields = ('usuario__nome',)

admin.site.register(models.Professor, ProfessorAdmin)
