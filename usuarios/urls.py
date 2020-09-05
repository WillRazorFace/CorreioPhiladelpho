from django.urls import path
from . import views

urlpatterns = [
    path('entrar', views.entrar, name='entrar'),
    path('registrar', views.registrar, name='registrar')
]