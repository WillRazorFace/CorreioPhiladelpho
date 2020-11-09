from django.urls import path
from . import views

urlpatterns = [
    path('', views.geral, name='professor-geral'),
    path('aprovar-comentario', views.aprovar_comentario, name='aprovar-comentario'),
    path('deletar-comentario', views.deletar_comentario, name='deletar-comentario'),
    path('escrever', views.escrever, name='professor-escrever'),
    path('salvar-publicacao', views.salvar_publicacao, name='salvar-publicacao'),
]