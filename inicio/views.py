from django.shortcuts import render
from .forms import FeedbackForm

def index(request):
    if request.method == 'GET':
        form = FeedbackForm()
        
        if request.user.is_authenticated:
            form.fields['email'].initial = request.user.email
            form.fields['email'].widget.attrs['disabled'] = True

        return render(request, 'inicio/index.html', {'form': form})
