from django.contrib import admin
from . import models


class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'email', 'feedback', 'data')
    list_display_links = ('data', 'feedback')


class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nome',)
    list_display_links = ('nome',)


class PostAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'subtitulo', 'categoria', 'data')
    list_display_links = ('titulo',)


class ComentarioAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'post', 'data')
    list_display_links = ('data',)



admin.site.register(models.Feedback, FeedbackAdmin)
admin.site.register(models.Categoria, CategoriaAdmin)
admin.site.register(models.Post, PostAdmin)
admin.site.register(models.Comentario, ComentarioAdmin)
