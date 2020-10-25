from inicio.forms import FeedbackFormLogado, FeedbackFormNaoLogado

def incluir_feedback(request):
    if request.user.is_authenticated:
        form = FeedbackFormLogado()
    else:
        form = FeedbackFormNaoLogado()
    
    return form
