from django.urls import path
from . import views

urlpatterns = [
    path('termos-e-condicoes', views.termos, name='termos'),
    path('equipe', views.equipe, name='equipe'),
]
