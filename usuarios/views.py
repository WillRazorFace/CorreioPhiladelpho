from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from .forms import LoginForm, CadastroForm
from usuarios.models import Usuario

def entrar(request):
    form = LoginForm()

    if request.user.is_authenticated:
        return redirect('index')

    if request.method != 'POST':
        return render(request, 'usuarios/entrar.html', {'form': form})

    form = LoginForm(data=request.POST or None)

    if form.is_valid():
        email = request.POST.get('email')
        senha = request.POST.get('password')

        usuario = authenticate(request, email=email, password=senha)

        if not usuario:
            messages.error(request, 'E-mail ou senha inválidos')
            return render(request, 'usuarios/entrar.html', {'form': form})

        login(request, user=usuario)
        messages.success(request, f'Bem-vindo, {usuario.nome}')
        return redirect('index')
    else:
        return render(request, 'usuarios/entrar.html', {'form': form})

def registrar(request):
    form = CadastroForm()
    pagina_anterior = request.GET.get('proximo')

    if not pagina_anterior:
        pagina_anterior = '/'
    
    return render(request, 'usuarios/criar.html', {'form': form, 'proximo': pagina_anterior})

def sair(request):
    logout(request)

    return redirect('index')
