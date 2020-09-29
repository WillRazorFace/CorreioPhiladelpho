from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .forms import FeedbackFormNaoLogado, FeedbackFormLogado
from .models import Post, Feedback
from django.shortcuts import HttpResponse

def salvar_feedback(request):
    if request.method == "POST":
        email = request.POST.get('email') or request.user.email
        feedback = request.POST.get('feedback')

        if request.user.is_authenticated:
            Feedback.objects.create(usuario=request.user,email=email, feedback=feedback)
        else:
            Feedback.objects.create(email=email, feedback=feedback)

        return HttpResponse('Olá')

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
