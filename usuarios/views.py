from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.password_validation import MinimumLengthValidator, CommonPasswordValidator, NumericPasswordValidator
from django.core.exceptions import ValidationError
from django.contrib import messages
from .forms import LoginForm, CadastroForm
from inicio.models import Comentario, Post
from usuarios.models import Usuario
from django.views.decorators.http import require_GET, require_POST, require_http_methods
from django.template.loader import render_to_string
# TODO: Corrigir o validador (considera letras com acentos inválidas)
from utils.validadores import checar_caracteres_especiais_e_numeros
from utils.feedback import incluir_feedback
from json import loads
import email_validator

@require_GET
def entrar(request):
    if request.user.is_authenticated:
        return redirect('index')
    
    form = LoginForm()
    pagina_anterior = request.GET.get('proximo')

    if not pagina_anterior:
        pagina_anterior = '/'

    return render(request, 'usuarios/entrar.html', {'form': form, 'proximo': pagina_anterior})

#Fetch API
@require_POST
def fazer_login(request):
    form = LoginForm(data=request.POST or None)

    if form.is_valid():
        email = request.POST.get('email')
        senha = request.POST.get('password')

        usuario = authenticate(request, email=email, password=senha)

        if usuario:
            login(request, usuario)

            messages.success(request, f'Bem-vindo, {usuario.nome}')

            return HttpResponse(status=200)
        else:
            return HttpResponse(status=404)
    
    return HttpResponse(status=409)

@require_GET
def registrar(request):
    if request.user.is_authenticated:
        messages.warning(request, f'Você já está logado, {request.user.nome}. Faça logout se quiser criar uma conta.')

        return redirect('index')

    form = CadastroForm()
    pagina_anterior = request.GET.get('proximo')

    if not pagina_anterior:
        pagina_anterior = '/'
        
    return render(request, 'usuarios/criar.html', {'form': form, 'proximo': pagina_anterior})

#Fetch API
@require_POST
def criar_usuario(request):
    form = CadastroForm(data=request.POST, files=request.FILES or None)

    if form.is_valid():
        senha = form.cleaned_data.get('password')

        novo_usuario = form.save(commit=False)
        novo_usuario.set_password(senha)
        novo_usuario.save()

        email = form.cleaned_data.get('email')

        usuario = authenticate(request, email=email, password=senha)
        login(request, usuario)

        messages.warning(request, 'Confirme seu e-mail para interagir com a plataforma. As instruções foram enviadas a você.')
            
        return HttpResponse(status=201)    

    return HttpResponse(status=409)

#Fetch API
@require_POST
def validacao_nome_registro(request):
    nome = loads(request.body)['valor']
    resposta = {}

    if checar_caracteres_especiais_e_numeros(nome):
        status = 400
        resposta['status'] = 'inválido'
        resposta['erro'] = 'Seu nome não pode conter caracteres especiais nem números'
    else:
        status = 200
        resposta['status'] = 'válido'

    return JsonResponse(resposta, status=status)

#Fetch API
@require_POST
def validacao_sobrenome_registro(request):
    sobrenome = loads(request.body)['valor']
    resposta = {}

    if checar_caracteres_especiais_e_numeros(sobrenome):
        status = 400
        resposta['status'] = 'inválido'
        resposta['erro'] = 'Seu sobrenome não pode conter caracteres especiais nem números'
    else:
        status = 200
        resposta['status'] = 'válido'

    return JsonResponse(resposta, status=status)

#Fetch API
@require_POST
def validacao_email_registro(request):
    email = loads(request.body)['valor']
    resposta = {}

    try:
        existente = Usuario.objects.get(email=email)
    except Usuario.DoesNotExist:
        existente = False
    
    try:
        valido = email_validator.validate_email(email)
    except email_validator.EmailSyntaxError:
        valido = False
    except:
        valido = True
    
    if not valido:
        status = 400
        resposta['status'] = 'inválido'
        resposta['erro'] = 'O e-mail digitado é inválido'
    elif existente:
        status = 409
        resposta['status'] = 'inválido'
        resposta['erro'] = 'O e-mail digitado já foi cadastrado'
    else:
        status = 200
        resposta['status'] = 'válido'

    return JsonResponse(resposta, status=status)

#Fetch API
@require_POST
def validacao_senha_registro(request):
    senha = loads(request.body)['valor']
    resposta = {}

    tamanho_minimo = MinimumLengthValidator(8)
    numerica = NumericPasswordValidator()
    comum = CommonPasswordValidator()

    # Checando se a senha tem no mínimo 8 caracteres
    try:
        tamanho_minimo.validate(senha)
    except ValidationError:
        tamanho_minimo = False

    # Checando se a senha é totalmente numérica
    try:
        numerica.validate(senha)
    except ValidationError:
        numerica = False

    # Checando se a senha é comum
    try:
        comum.validate(senha)
    except ValidationError:
        comum = False

    if not tamanho_minimo:
        status = 400
        resposta['status'] = 'inválido'
        resposta['erro'] = 'Sua senha deve conter pelo menos 8 caracteres'
    elif not numerica:
        status = 400
        resposta['status'] = 'inválido'
        resposta['erro'] = 'Sua senha não pode ser inteiramente numérica'
    elif not comum:
        status = 400
        resposta['status'] = 'inválido'
        resposta['erro'] = 'Essa senha é muito comum. Tente outra.'
    else:
        status = 200
        resposta['status'] = 'válido'

    return JsonResponse(resposta, status=status)

def sair(request):
    pagina_anterior = request.GET.get('proximo')

    if not pagina_anterior:
        pagina_anterior = '/'
    
    logout(request)

    return redirect(pagina_anterior)

@require_GET
@login_required(login_url='entrar', redirect_field_name='proximo')
def perfil(request):
    pagina_anterior = request.GET.get('proximo')

    if not pagina_anterior:
        pagina_anterior = '/'

    form = incluir_feedback(request)

    return render(request, 'usuarios/perfil.html', {'form': form, 'proximo': pagina_anterior})

@require_POST
@login_required(login_url='entrar', redirect_field_name='proximo')
def dispor_secao_perfil(request):
    secao = loads(request.body)['secao']

    if secao == 'info':
        html = render_to_string(
            template_name='usuarios/parciais/_perfil-direita.html',
            context={'secao': 'info', 'usuario': request.user },
        )
    elif secao == 'comentarios':
        comentarios = Comentario.objects.all().filter(usuario=request.user).order_by('-data')

        html = render_to_string(
            template_name='usuarios/parciais/_perfil-direita.html',
            context={'secao': 'comentarios', 'usuario': request.user, 'comentarios': comentarios},
        )
    elif secao == 'pubs':
        html = render_to_string(
            template_name='usuarios/parciais/_perfil-direita.html',
            context={'secao': 'pubs', 'usuario': request.user },
        )

    return JsonResponse({'html': html}, safe=False)

# Fetch API
@require_POST
@login_required(login_url='entrar', redirect_field_name='proximo')
def alterar_perfil(request):
    usuario = request.user
    dados = loads(request.body)
    alterado = False
    contexto = {}

    nome = dados['nome']
    sobrenome = dados['sobrenome']
    email = dados['email']
    newsletter = dados['newsletter']

    if nome != usuario.nome:
        if checar_caracteres_especiais_e_numeros(nome):
            return JsonResponse({
                'field': 'nome',
                'erro': 'Seu nome não pode conter caracteres especiais nem números'
            }, status=409)
        
        usuario.nome = nome
        alterado = True
    
    if sobrenome != usuario.sobrenome:
        if checar_caracteres_especiais_e_numeros(sobrenome):
            return JsonResponse({
                'field': 'sobrenome',
                'erro': 'Seu sobrenome não pode conter caracteres especiais nem números'
            }, status=409)
        elif sobrenome == nome:
            return JsonResponse({
                'field': 'sobrenome',
                'erro': 'Seu sobrenome não pode ser igual ao seu nome'
            }, status=409)

        usuario.sobrenome = sobrenome
        alterado = True

    if email != usuario.email:
        try:
            existente = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            existente = False
    
        try:
            valido = email_validator.validate_email(email)
        except email_validator.EmailSyntaxError as e:
            valido = False
        except:
            valido = False

        if not valido:
            return JsonResponse({
                'field': 'email',
                'erro': 'O e-mail digitado é inválido'
            }, status=409)
        elif existente:
            return JsonResponse({
                'field': 'email',
                'erro': 'O e-mail digitado já foi cadastrado'
            }, status=409)

        usuario.email = email
        # TODO: Reenviar e-mail de verificação quando usuário mudar seu e-mail
        usuario.is_verified = False
        alterado = True
        contexto['email_alterado'] = 'true'

    if newsletter != usuario.newsletter:
        usuario.newsletter = newsletter
        alterado = True

    if alterado:
        usuario.save()

        contexto['mensagem'] = 'Dados alterados com sucesso'

    return JsonResponse(contexto, status=200)

# Fetch API
@require_POST
def validacao_email_recuperacao_senha(request):
    email = loads(request.body)['valor']
    resposta = {}

    try:
        existente = Usuario.objects.get(email=email)
    except Usuario.DoesNotExist:
        existente = False
    
    try:
        valido = email_validator.validate_email(email)
    except email_validator.EmailSyntaxError:
        valido = False
    except:
        valido = True

    if not valido:
        status = 409
        resposta['status'] = 'inválido'
        resposta['erro'] = 'O e-mail digitado não é válido'
    elif not existente:
        status = 409
        resposta['status'] = 'inválido'
        resposta['erro'] = 'O e-mail digitado não está cadastrado no site'
    else:
        status = 200
        resposta['status'] = 'válido'

    return JsonResponse(resposta, status=status)

# Fetch API
@require_POST
def validacao_senha_recuperacao_senha(request):
    print(loads(request.body))

    return HttpResponse(status=200)