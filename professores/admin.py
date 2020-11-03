from django.contrib import admin
from . import models


class ProfessorAdmin(admin.ModelAdmin):
    list_display = ('usuario',)
    list_display_links = ('usuario',)


admin.site.register(models.Professor, ProfessorAdmin)
