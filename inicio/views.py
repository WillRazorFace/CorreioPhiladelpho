from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import FeedbackFormNaoLogado, FeedbackFormLogado
from .models import Post

def index(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            form = FeedbackFormLogado()
        else:
            form = FeedbackFormNaoLogado()

        destaques = Post.objects.prefetch_related('categoria').filter(destaque=True).order_by('-id')
        posts = Post.objects.prefetch_related('categoria').all().order_by('-id')

        return render(request, 'inicio/index.html', {'form': form, 'posts': posts, 'destaques': destaques})
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
