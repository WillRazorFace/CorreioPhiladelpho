from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import FeedbackFormNaoLogado, FeedbackFormLogado

def index(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            form = FeedbackFormLogado()
        else:
            form = FeedbackFormNaoLogado()

        return render(request, 'inicio/index.html', {'form': form})
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
