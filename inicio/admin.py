from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from . import models


class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'email', 'feedback', 'data')
    list_display_links = ('data', 'feedback')
    search_fields = ('usuario__nome', 'email', 'feedback')


class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nome',)
    list_display_links = ('nome',)
    search_fields = ('nome',)


class PostAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'subtitulo', 'categoria', 'data')
    list_display_links = ('titulo',)
    search_fields = ('titulo', 'subtitulo', 'categoria__nome')


class ComentarioAdmin(MPTTModelAdmin):
    list_display = ('usuario', 'post', 'conteudo', 'data')
    list_display_links = ('conteudo',)
    search_fields = ('conteudo', 'usuario__nome', 'usuario__email')



admin.site.register(models.Feedback, FeedbackAdmin)
admin.site.register(models.Categoria, CategoriaAdmin)
admin.site.register(models.Post, PostAdmin)
admin.site.register(models.Comentario, ComentarioAdmin)
