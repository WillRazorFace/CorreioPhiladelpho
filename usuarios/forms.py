from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Usuario

class FormCriarUsuario(UserCreationForm):

    class Meta(UserCreationForm):
        model = Usuario
        fields = ('nome', 'sobrenome', 'email', 'foto', 'password')

class FormMudarUsuario(UserChangeForm):

    class Meta:
        model = Usuario
        fields = ('nome', 'sobrenome', 'email', 'foto', 'password')