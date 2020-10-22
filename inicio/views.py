from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .forms import FeedbackFormNaoLogado, FeedbackFormLogado, ComentarioForm, RespostaForm
from .models import Post, Feedback, Comentario
from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.db.models import Q
from django.views.decorators.http import require_GET, require_POST

@require_GET
def buscar(request):
    if request.user.is_authenticated:
        form = FeedbackFormLogado()
    else:
        form = FeedbackFormNaoLogado()
    
    termo = request.GET.get("p")

    return render(request, 'inicio/busca.html', {'form': form, 'termo': termo})

# Fetch API
@require_GET
def buscar_posts(request):
    termo = request.GET.get("p")

    if termo:
        posts = Post.objects.filter(Q(titulo__icontains=termo) | Q(subtitulo__icontains=termo) | Q(conteudo__icontains=termo))
    else:
        posts = None
    
    if posts:
        if posts.exists():
            contexto = {'posts': posts, 'termo': termo}
        else:
            contexto = {'termo': termo, 'resultado': 'Nada encontrado'}
    else:
        if termo:
            contexto = {'termo': termo, 'resultado': 'Nada encontrado'}
        else:
            contexto = {}


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
    if request.user.is_authenticated:
        form = FeedbackFormLogado()
    else:
        form = FeedbackFormNaoLogado()

    # Retorna as 5 publicações com mais acessos
    populares = Post.objects.prefetch_related('categoria').order_by('-acessos')[:5]

    posts = Post.objects.prefetch_related('categoria').all().order_by('-id')

    return render(request, 'inicio/index.html', {'form': form, 'posts': posts, 'populares': populares})

@require_GET
def publicacao(request, slug: str):
    if request.user.is_authenticated:
        form = FeedbackFormLogado()
    else:
        form = FeedbackFormNaoLogado()
        
    post = get_object_or_404(Post, slug=slug)
    comentarios = post.comentarios.all
    form_comentario = ComentarioForm()

    # Adiciona um ao contador de visualizações
    post.acessos += 1
    post.save()

    return render(
        request,
        'inicio/publicacao.html',
        {'post': post, 'comentarios': comentarios, 'form_comentario': form_comentario, 'form': form},
    )

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
        
        print(form.cleaned_data.get('post'))
        return HttpResponse(status=409)
    else:
        return HttpResponse(status=409)
