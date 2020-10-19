from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_GET


@require_GET
def termos(request):
    return render(request, 'sobre/termos-e-condicoes.html')


@require_GET
def equipe(request):
    return render(request, 'sobre/equipe.html')
