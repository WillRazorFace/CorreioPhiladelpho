from django.shortcuts import render
from .forms import LoginForm, CadastroForm

def entrar(request):
    form = LoginForm()

    return render(request, 'usuarios/entrar.html', {'form': form})

def registrar(request):
    form = CadastroForm()

    return render(request, 'usuarios/criar.html', {'form': form})