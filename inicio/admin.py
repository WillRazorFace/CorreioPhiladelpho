from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from . import models


class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'email', 'feedback', 'data')
    list_display_links = ('data', 'feedback')
    search_fields = ('usuario__nome', 'email', 'feedback')

    fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ()}
        ),

        ('Rementente', {'fields': ('usuario', 'email')}),
        ('Conteúdo', {'fields': ('feedback',)}),
        ('Data', {'fields': ('data',)}),
    )


class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nome',)
    list_display_links = ('nome',)
    search_fields = ('nome',)

    fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ()
        }),

        ('Identificação da categoria', {'fields': ('nome',)})
    )


class PostAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'subtitulo', 'categoria', 'data')
    list_display_links = ('titulo',)
    search_fields = ('titulo', 'subtitulo', 'categoria__nome')

    fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ()
        }),

        ('Usuário e Publicação', {'fields': ('usuario',)}),
        ('Identificação', {'fields': ('titulo', 'subtitulo')}),
        ('Conteúdo', {'fields': ('conteudo',)}),
        ('Categoria', {'fields': ('categoria',)}),
        ('Data', {'fields': ('data',)}),
        ('Informações adicionais', {'classes': ('collapse',), 'fields': ('acessos', 'foto', 'slug', 'curtidas')})
    )


class ComentarioAdmin(MPTTModelAdmin):
    list_display = ('usuario', 'post', 'conteudo', 'data')
    list_display_links = ('conteudo',)
    search_fields = ('conteudo', 'usuario__nome', 'usuario__email')

    fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ()
        }),

        ('Usuário e Publicação', {'fields': ('usuario', 'post')}),
        ('Conteúdo', {'fields': ('conteudo',)}),
        ('Data', {'fields': ('data',)}),
        ('Informações adicionais', {'classes': ('collapse',), 'fields': ('comentario_pai', 'aprovado')})
    )



admin.site.register(models.Feedback, FeedbackAdmin)
admin.site.register(models.Categoria, CategoriaAdmin)
admin.site.register(models.Post, PostAdmin)
admin.site.register(models.Comentario, ComentarioAdmin)
