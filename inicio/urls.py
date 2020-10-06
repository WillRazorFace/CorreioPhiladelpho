from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('publicacao/<str:slug>', views.publicacao, name='publicacao'),
    path('enviar-feedback/', views.salvar_feedback, name="feedback"),
    path('buscar', views.buscar, name="buscar"),
    path('buscar-posts', views.buscar_posts, name="buscar-api"),
]