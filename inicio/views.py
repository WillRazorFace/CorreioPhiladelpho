from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .forms import FeedbackFormNaoLogado, FeedbackFormLogado
from .models import Post, Feedback
from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.template.loader import render_to_string

def buscar(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            form = FeedbackFormLogado()
        else:
            form = FeedbackFormNaoLogado()
    
    termo = request.GET.get("p")

    return render(request, 'inicio/busca.html', {'form': form, 'termo': termo})

# Fetch API
def buscar_posts(request):
    termo = request.GET.get("p")

    if termo:
        posts = Post.objects.filter(titulo__icontains=termo)
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
def salvar_feedback(request):
    if request.method == 'POST':
        email = request.POST.get('email') or request.user.email
        feedback = request.POST.get('feedback')

        if request.user.is_authenticated:
            Feedback.objects.create(usuario=request.user,email=email, feedback=feedback)
        else:
            Feedback.objects.create(email=email, feedback=feedback)

        return HttpResponse('Enviado')

def index(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            form = FeedbackFormLogado()
        else:
            form = FeedbackFormNaoLogado()

        populares = Post.objects.prefetch_related('categoria').filter(destaque=True).order_by('-id')
        posts = Post.objects.prefetch_related('categoria').all().order_by('-id')

        return render(request, 'inicio/index.html', {'form': form, 'posts': posts, 'populares': populares})

def publicacao(request, slug: str):
    if request.method == 'GET':
        if request.user.is_authenticated:
            form = FeedbackFormLogado()
        else:
            form = FeedbackFormNaoLogado()
        
        post = get_object_or_404(Post, slug=slug)

        return render(request, 'inicio/publicacao.html', {'post': post, 'form': form})
