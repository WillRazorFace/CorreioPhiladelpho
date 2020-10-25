from django.urls import path
from . import views

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
]