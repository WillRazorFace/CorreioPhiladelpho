from django.contrib import admin
from . import models


class ProfessorAdmin(admin.ModelAdmin):
    list_display = ('usuario',)
    list_display_links = ('usuario',)
    search_fields = ('usuario__nome',)

    fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ()
        }),

        ('Usuário', {'fields': ('usuario',)})
    )

admin.site.register(models.Professor, ProfessorAdmin)
