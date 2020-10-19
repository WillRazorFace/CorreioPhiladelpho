from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_GET
from inicio.forms import FeedbackFormLogado, FeedbackFormNaoLogado

@require_GET
def termos(request):
    if request.user.is_authenticated:
        form = FeedbackFormLogado()
    else:
        form = FeedbackFormNaoLogado()
    
    return render(request, 'sobre/termos.html', {'form': form})


@require_GET
def equipe(request):
    if request.user.is_authenticated:
        form = FeedbackFormLogado()
    else:
        form = FeedbackFormNaoLogado()
    
    return render(request, 'sobre/equipe.html', {'form': form})
