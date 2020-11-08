from django.shortcuts import render
from utils.feedback import incluir_feedback
from utils.professores import professor_requerido
from utils.redirecionamento import definir_url_anterior
from django.views.decorators.http import require_GET, require_POST
from django.http import HttpResponse
from inicio.models import Comentario
from json import loads
from inicio.models import Post
from inicio.forms import PostForm

@require_GET
@professor_requerido
def geral(request):
    form = incluir_feedback(request)
    publicacoes = Post.objects.all().filter(usuario=request.user).order_by('-id')
    qnt_acessos = 0
    qnt_comentarios = 0
    qnt_analise = 0
    qnt_curtidas = 0

    for publicacao in publicacoes:
        qnt_acessos += publicacao.acessos
        qnt_comentarios += publicacao.comentarios.count()
        qnt_analise += publicacao.comentarios.filter(aprovado=False).count()
        qnt_curtidas += publicacao.curtidas.count()

    return render(
        request, 
        'professores/geral.html',
        {
            'form': form,
            'publicacoes': publicacoes,
            'qnt_acessos': qnt_acessos,
            'qnt_comentarios': qnt_comentarios,
            'qnt_analise': qnt_analise,
            'qnt_curtidas': qnt_curtidas,
        }
    )

@require_GET
@professor_requerido
def escrever(request):
    form = incluir_feedback(request)
    form_post = PostForm()
    proximo = definir_url_anterior(request)

    return render(request, 'professores/escrever.html', {'form': form, 'form_post': form_post, 'proximo': proximo})

@require_POST
@professor_requerido
def aprovar_comentario(request):
    comentario_id = loads(request.body)['comentario_id']

    try:
        comentario = Comentario.objects.get(id=comentario_id)

        comentario.aprovado = True
        comentario.save()
    except Comentario.DoesNotExist:
        return HttpResponse(status=409)

    return HttpResponse(status=200)

@require_POST
@professor_requerido
def deletar_comentario(request):
    comentario_id = loads(request.body)['comentario_id']

    try:
        comentario = Comentario.objects.get(id=comentario_id)
        
        comentario.delete()
    except Comentario.DoesNotExist:
        return HttpResponse(status=409)

    return HttpResponse(status=200)
