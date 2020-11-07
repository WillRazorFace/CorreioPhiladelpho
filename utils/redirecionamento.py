def definir_url_anterior(request):
    pagina_anterior = request.GET.get('proximo')

    if not pagina_anterior:
        pagina_anterior = '/'

    return pagina_anterior
