from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('criar-usuario', views.criar_usuario, name='criar-usuario'),
    path('fazer-login', views.fazer_login, name='fazer-login'),
    path('entrar', views.entrar, name='entrar'),
    path('registrar', views.registrar, name='registrar'),

    path('registrar/validar-nome', views.validacao_nome_registro, name='validar-nome'),
    path('registrar/validar-sobrenome', views.validacao_sobrenome_registro, name='validar-sobrenome'),
    path('registrar/validar-email', views.validacao_email_registro, name='validar-email'),
    path('registrar/validar-senha', views.validacao_senha_registro, name='validar-senha'),

    path('sair', views.sair, name='sair'),

    path('perfil', views.perfil, name='perfil'),
    path('perfil/dispor-secao-perfil', views.dispor_secao_perfil, name='dispor-secao-perfil'),
    path('perfil/alterar-perfil', views.alterar_perfil, name='alterar-perfil'),

    path('recuperar-senha', auth_views.PasswordResetView.as_view(template_name='usuarios/recuperar-senha.html'), name='recuperar-senha'),
    path('recuperar-senha/validar-email', views.validacao_email_recuperacao_senha, name='validar-email-recuperacao-senha'),
    path('recuperar-senha/enviado', auth_views.PasswordResetDoneView.as_view(template_name='usuarios/recuperar-senha-enviado.html'), name='password_reset_done'),
    path('recuperar-senha/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(template_name='usuarios/recuperar-senha-form.html'), name='password_reset_confirm'),
    path('senha-recuperada', auth_views.PasswordResetCompleteView.as_view(template_name='usuarios/recuperar-senha-completo.html'), name='password_reset_complete'),
]