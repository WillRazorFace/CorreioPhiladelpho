from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import FormCriarUsuario, FormMudarUsuario
from .models import Usuario


class CustomUserAdmin(UserAdmin):
    add_form = FormCriarUsuario
    form = FormMudarUsuario
    model = Usuario

    list_display = ('email', 'nome', 'sobrenome', 'is_staff', 'is_active', 'is_verified', 'newsletter', 'date_joined', 'last_login')
    list_filter = ('email', 'nome', 'sobrenome', 'is_staff', 'is_active', 'is_verified', 'newsletter', 'date_joined', 'last_login')

    # Fields do Form de mudança
    fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ()}
        ),

        ('Informações básicas', {'fields': ('nome', 'sobrenome', 'email')}),
        ('Indentificação', {'fields': ('foto', )}),
        ('Permissões', {'fields': ('is_staff', 'is_active')}),
        ('Verificação', {'fields': ('is_verified', 'newsletter')}),
    )

    # Fields do Form de criação
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ()}
        ),

        ('Informações básicas', {'fields': ('nome', 'sobrenome', 'email')}),
        ('Indentificação', {'fields': ('foto', )}),
        ('Autenticação', {'fields': ('password1', 'password2')}),
        ('Permissões', {'fields': ('is_staff', 'is_active')}),
        ('Verificação', {'fields': ('is_verified',)}),
    )
    
    search_fields = ('email', 'nome', 'sobrenome')
    ordering = ('email', 'nome', 'sobrenome', 'date_joined', 'last_login')


admin.site.register(Usuario, CustomUserAdmin)