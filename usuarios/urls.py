from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('criar-usuario', views.criar_usuario, name='criar-usuario'),
    path('ativar-conta/<uidb64>/<token>', views.ativar_conta, name='ativar-conta'),
    path('fazer-login', views.fazer_login, name='fazer-login'),
    path('entrar', views.entrar, name='entrar'),
    path('registrar', views.registrar, name='registrar'),

    path('reenviar-email-ativacao', views.reenviar_email_ativacao, name='reenviar-email-ativacao'),

    path('registrar/validar-nome', views.validacao_nome_registro, name='validar-nome'),
    path('registrar/validar-sobrenome', views.validacao_sobrenome_registro, name='validar-sobrenome'),
    path('registrar/validar-email', views.validacao_email_registro, name='validar-email'),
    path('registrar/validar-senha', views.validacao_senha_registro, name='validar-senha'),

    path('sair', views.sair, name='sair'),

    path('perfil', views.perfil, name='perfil'),
    path('perfil/dispor-secao-perfil', views.dispor_secao_perfil, name='dispor-secao-perfil'),
    path('perfil/alterar-perfil', views.alterar_perfil, name='alterar-perfil'),
    path('perfil/alterar-foto-de-perfil', views.alterar_foto_de_perfil, name='alterar-foto-de-perfil'),

    path('redefinir-senha', auth_views.PasswordChangeView.as_view(template_name='usuarios/redefinir-senha.html'), name='redefinir-senha'),
    path('redefinir-senha/validar-senha-atual', views.validacao_senha_atual_redefinicao, name='validar-senha-atual-redefinicao'),
    path('redefinir-senha/validar-senha', views.validacao_senha_redefinicao, name='validar-senha-redefinicao'),
    path('redefinir-senha/redefinida', auth_views.PasswordChangeDoneView.as_view(template_name='usuarios/redefinir-senha-redefinida.html'), name='password_change_done'),

    path(
        'recuperar-senha',
        auth_views.PasswordResetView.as_view(
            template_name='usuarios/recuperar-senha.html',
            subject_template_name='usuarios/email/recuperacao-de-senha-subject.txt',
            email_template_name='usuarios/email/recuperacao-de-senha.txt',
            html_email_template_name='usuarios/email/recuperacao-de-senha.html',
        ),
        name='recuperar-senha'
    ),
    path('recuperar-senha/validar-email', views.validacao_email_recuperacao_senha, name='validar-email-recuperacao-senha'),
    path('recuperar-senha/enviado', auth_views.PasswordResetDoneView.as_view(template_name='usuarios/recuperar-senha-enviado.html'), name='password_reset_done'),
    path('recuperar-senha/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(template_name='usuarios/recuperar-senha-form.html'), name='password_reset_confirm'),
    path('senha-recuperada', auth_views.PasswordResetCompleteView.as_view(template_name='usuarios/recuperar-senha-completo.html'), name='password_reset_complete'),
]