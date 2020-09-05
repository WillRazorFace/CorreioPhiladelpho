from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Usuario
from django import forms
from crispy_forms.helper import FormHelper


class FormCriarUsuario(UserCreationForm):

    class Meta(UserCreationForm):
        model = Usuario
        fields = ('nome', 'sobrenome', 'email', 'foto', 'password')


class FormMudarUsuario(UserChangeForm):

    class Meta:
        model = Usuario
        fields = ('nome', 'sobrenome', 'email', 'foto', 'password')


class LoginForm(forms.ModelForm):
    # Form para o login do usuário
    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False
    
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'class': 'text-center', 'placeholder': 'Endereço de e-mail'}),
        max_length=100,
    )

    password = forms.CharField(
        required=True,
        widget=forms.PasswordInput(attrs={'class': 'text-center', 'placeholder': 'Senha'}),
        max_length=50,
    )

    class Meta:
        model = Usuario
        fields = ('email', 'password')
