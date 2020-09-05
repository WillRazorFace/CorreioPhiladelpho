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

class CadastroForm(forms.ModelForm):
    # Form para o cadastro do usuário
    def __init__(self, *args, **kwargs):
        super(CadastroForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False

    nome = forms.CharField(
        required=True,
        widget=forms.TextInput(attrs={'class': 'text-center', 'placeholder': 'Nome'}),
        max_length=40,
    )

    sobrenome = forms.CharField(
        required=True,
        widget=forms.TextInput(attrs={'class': 'text-center', 'placeholder': 'Sobrenome'}),
        max_length=40,
    )

    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'class': 'text-center', 'placeholder': 'Endereço de e-mail'}),
        max_length=100,
    )

    password = forms.CharField(
        required=True,
        widget=forms.PasswordInput(attrs={'class': 'text-center', 'placeholder': 'Senha'})
    )

    password_confirmacao = forms.CharField(
        required=True,
        widget=forms.PasswordInput(attrs={'class': 'text-center', 'placeholder': 'Confirme sua senha'}),
    )

    foto = forms.ImageField(
        required=False,
        widget=forms.FileInput(attrs={'class': 'text-center'}),
        help_text='Foto que será exibida em seu perfil',
    )

    newsletter = forms.BooleanField(
        required=False,
        initial=True,
    )

    class Meta:
        model = Usuario
        fields = ('nome', 'sobrenome', 'email', 'password', 'foto', 'newsletter')


