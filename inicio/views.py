from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.core.exceptions import ObjectDoesNotExist
from .forms import FeedbackFormNaoLogado, FeedbackFormLogado, ComentarioForm, RespostaForm
from .models import Post, Feedback, Comentario, Categoria
from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.db.models import Q
from django.views.decorators.http import require_GET, require_POST
from utils.feedback import incluir_feedback
from json import loads

@require_GET
def buscar(request):
    form = incluir_feedback(request)
    termo = request.GET.get("p")
    categoria = request.GET.get("categoria")

    contexto = {
        'form': form,
        'termo': termo
    }

    if categoria:
        categoria = Categoria.objects.get(nome=categoria)
        publicacoes = Post.objects.all().filter(categoria=categoria.id)

        contexto['categoria_url'] = categoria.nome
    else:
        publicacoes = Post.objects.all()

        contexto['categoria_url'] = None
    
    categorias = Categoria.objects.all()

    contexto['categorias'], contexto['publicacoes'] = categorias, publicacoes

    return render(request, 'inicio/busca.html', contexto)

# Fetch API
@require_GET
def buscar_posts(request):
    termo = request.GET.get("p")
    categoria = request.GET.get("categoria")

    if termo:
        if categoria != 'Todas':
            categoria = Categoria.objects.get(nome=categoria)

            publicacoes = Post.objects.filter(Q(titulo__icontains=termo) | Q(subtitulo__icontains=termo) | Q(conteudo__icontains=termo), categoria=categoria.id)
        else:
            publicacoes = Post.objects.filter(Q(titulo__icontains=termo) | Q(subtitulo__icontains=termo) | Q(conteudo__icontains=termo))
    else:
        if categoria != 'Todas':
            categoria = Categoria.objects.get(nome=categoria)
            publicacoes = Post.objects.all().filter(categoria=categoria.id)
        else:
            publicacoes = Post.objects.all()

    if publicacoes:
        if publicacoes.exists():
            contexto = {'publicacoes': publicacoes, 'termo': termo}
        else:
            contexto = {'termo': termo, 'resultado': 'Nada encontrado'}
    else:
        if termo:
            contexto = {'termo': termo, 'resultado': 'Nada encontrado'}
        else:
            contexto = {'resultado': 'Nada encontrado'}


    html = render_to_string(
        template_name='inicio/parciais/_pesquisa-posts.html',
        context=contexto,
    )
    
    return JsonResponse({'html': html}, safe=False)

# Fetch API
@require_POST
def salvar_feedback(request):
    if request.user.is_authenticated:
        form = FeedbackFormLogado(data=request.POST)

        if form.is_valid():
            form.save()
        else:
            return HttpResponse(status=409)
    else:
        form = FeedbackFormNaoLogado(data=request.POST)

        if form.is_valid():
            form.save()
        else:
            return HttpResponse(status=409)

    return HttpResponse(status=201)

@require_GET
def index(request):
    form = incluir_feedback(request)

    # Retorna as 5 publicações com mais acessos
    populares = Post.objects.prefetch_related('categoria').order_by('-acessos')[:5]

    posts = Post.objects.prefetch_related('categoria').all().order_by('-id')

    return render(request, 'inicio/index.html', {'form': form, 'posts': posts, 'populares': populares})

@require_GET
def publicacao(request, slug: str):
    form = incluir_feedback(request)
    post = get_object_or_404(Post, slug=slug)
    comentarios = post.comentarios.prefetch_related('usuario').filter(aprovado=True)
    form_comentario = ComentarioForm()

    if not request.user.is_authenticated:
        comentarios = post.comentarios.prefetch_related('usuario').filter(aprovado=True)
    elif request.user.is_authenticated:
        try:
            professor = request.user.is_professor
        except ObjectDoesNotExist:
            professor = False
        
        if professor:
            comentarios = post.comentarios.prefetch_related('usuario')
        else:
            comentarios = comentarios | post.comentarios.prefetch_related('usuario').filter(
                usuario=request.user
            ).filter(aprovado=False)

    # Adiciona um ao contador de visualizações
    post.acessos += 1
    post.save()

    contexto = {
        'post': post,
        'comentarios': comentarios,
        'form_comentario': form_comentario,
        'form': form
    }

    return render(request, 'inicio/publicacao.html', contexto)

#Fetch API
@require_POST
def curtir_post(request):
    try:
        curtido = loads(request.body)['curtido']
        post = get_object_or_404(Post, slug=loads(request.body)['post'])

        if curtido == 'sim':
            post.curtidas.add(request.user)

            return HttpResponse(status=200)
        elif curtido == 'não':
            post.curtidas.remove(request.user)

            return HttpResponse(status=200)
    except KeyError:
        return HttpResponse(status=409)

#Fetch API
@require_POST
def salvar_comentario(request):
    if request.POST.get('tipo') == 'comentario':
        form = ComentarioForm(data=request.POST)

        if form.is_valid():
            form.save()

            return HttpResponse(status=201)
        
        return HttpResponse(status=409)
    elif request.POST.get('tipo') == 'resposta':
        # Trata da requisição se for uma resposta a outro comentário
        form = RespostaForm(data=request.POST)

        if form.is_valid():
            resposta = form.save(commit=False)
            resposta.post = form.cleaned_data.get('comentario_pai').post
            resposta.save()

            return HttpResponse(status=201)
        
        return HttpResponse(status=409)
    else:
        return HttpResponse(status=409)
