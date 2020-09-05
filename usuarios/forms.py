from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Usuario
from django import forms
from crispy_forms.helper import FormHelper
from utils.validadores import checar_caracteres_especiais_e_numeros
from email_validator import validate_email


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

    def clean(self, *args, **kwargs):
        dados_limpos = self.cleaned_data

        email = dados_limpos.get('email')
        
        # Validando o email
        if not validate_email(email):
            self.add_error('email', 'Insira um e-mail válido')

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

    def clean(self, *args, **kwargs):
        dados_limpos = self.cleaned_data

        nome = dados_limpos.get('nome')
        sobrenome = dados_limpos.get('sobrenome')
        email = dados_limpos.get('email')
        senha = dados_limpos.get('password')
        senha_confirmacao = dados_limpos.get('password_confirmacao')

        # Validando o nome
        if checar_caracteres_especiais_e_numeros(nome):
            self.add_error('nome', 'Seu nome não pode conter caracteres especiais nem números')

        # Validando o sobrenome
        if checar_caracteres_especiais_e_numeros(sobrenome):
            self.add_error('sobrenome', 'Seu nome não pode conter caracteres especiais nem números')
        elif sobrenome == nome:
            self.add_error('sobrenome', 'Seu sobrenome não pode ser igual a seu nome.')

        # Validando o e-mail
        try:
            checagem_email = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            checagem_email = False

        if not validate_email(email):
            self.add_error('email', 'Insira um e-mail válido')
        elif checagem_email:
            self.add_error('email', 'Este endereço de e-mail já foi cadastrado')

        # Validando a senha
        if senha != senha_confirmacao:
            self.add_error('password_confirmacao', 'As senhas não coincidem')
    class Meta:
        model = Usuario
        fields = ('nome', 'sobrenome', 'email', 'password', 'foto', 'newsletter')


