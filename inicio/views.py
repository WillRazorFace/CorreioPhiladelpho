from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .forms import FeedbackFormNaoLogado, FeedbackFormLogado
from .models import Post

def index(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            form = FeedbackFormLogado()
        else:
            form = FeedbackFormNaoLogado()

        populares = Post.objects.prefetch_related('categoria').filter(destaque=True).order_by('-id')
        posts = Post.objects.prefetch_related('categoria').all().order_by('-id')

        return render(request, 'inicio/index.html', {'form': form, 'posts': posts, 'populares': populares})
    elif request.method == 'POST':
        if request.user.is_authenticated:
            form = FeedbackFormLogado(data=request.POST)

            feedback = form.save(commit=False)
            feedback.email = request.user.email
            feedback.usuario = request.user
            feedback.save()

            messages.success(request, 'Agradecemos seu feedback.')
            return redirect('index')
        else:
            form = FeedbackFormNaoLogado(data=request.POST)

            form.save()

            messages.success(request, 'Agradecemos seu feedback.')
            return redirect('index')

def publicacao(request, slug: str):
    if request.method == 'GET':
        if request.user.is_authenticated:
            form = FeedbackFormLogado()
        else:
            form = FeedbackFormNaoLogado()
        
        post = get_object_or_404(Post, slug=slug)

        return render(request, 'inicio/publicacao.html', {'post': post, 'form': form})
