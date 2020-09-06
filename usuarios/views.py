from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from .forms import LoginForm, CadastroForm
from usuarios.models import Usuario

def entrar(request):
    form = LoginForm()

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
        return redirect('index')
    else:
        return render(request, 'usuarios/entrar.html', {'form': form})

def registrar(request):
    form = CadastroForm()

    if request.method != 'POST':
        return render(request, 'usuarios/criar.html', {'form': form})
    
    form = CadastroForm(data=request.POST, files=request.FILES or None)
    senha = form.cleaned_data.get('password')

    if form.is_valid():
        novo_usuario = form.save(commit=False)
        novo_usuario.set_password(senha)
        novo_usuario.save()
    else:
        return render(request, 'usuarios/criar.html', {'form': form})
    
    email = form.cleaned_data.get('email')
    authenticate(request, email=email, password=senha)

    messages.warning(request, 'Confirme seu e-mail para interagir com a plataforma. As instruções foram enviadas a você.')
    return redirect('index')

def sair(request):
    logout(request)

    return redirect('index')
