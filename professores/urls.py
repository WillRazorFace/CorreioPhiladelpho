from django.urls import path
from . import views

urlpatterns = [
    path('', views.geral, name='professor-geral'),
    path('aprovar-comentario', views.aprovar_comentario, name='aprovar-comentario'),
    path('deletar-comentario', views.deletar_comentario, name='deletar-comentario'),
    path('escrever', views.escrever, name='professor-escrever'),
    path('criar-publicacao', views.criar_publicacao, name='criar-publicacao'),
    path('salvar-publicacao/<str:slug>', views.salvar_publicacao, name='salvar-publicacao'),
    path('excluir-publicacao', views.excluir_publicacao, name='excluir-publicacao'),
    path('alterar-publicacao/<str:slug>', views.alterar_publicacao, name='alterar-publicacao'),
]