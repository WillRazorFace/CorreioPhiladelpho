from django.shortcuts import render
from .forms import LoginForm

def entrar(request):
    form = LoginForm()

    return render(request, 'usuarios/entrar.html', {'form': form})
