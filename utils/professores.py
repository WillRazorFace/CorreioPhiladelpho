from django.shortcuts import redirect

def professor_requerido(funcao):
    def wrapper(request, *args, **kwargs):
        try:
            professor = request.user.is_professor
        except AttributeError:
            professor = None

        if not professor:
            return redirect('index')
        
        return funcao(request, *args, **kwargs)
    
    return wrapper
