from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from .managers import GerenciadorDeUsuario
from utils.imagens import redimensionar


class Usuario(AbstractBaseUser, PermissionsMixin):
    nome = models.CharField(max_length=40, verbose_name='Nome')
    sobrenome = models.CharField(max_length=40, verbose_name='Sobrenome')
    email = models.EmailField(_('Endereço de e-mail'), unique=True)
    foto = models.ImageField(upload_to='perfis/%Y/%m/%d', blank=True, null=True, verbose_name='Foto de Perfil')

    @property
    def nome_completo(self):
        return f'{self.nome} {self.sobrenome}'

    is_staff = models.BooleanField(default=False, verbose_name='Staff')
    is_active = models.BooleanField(default=True, verbose_name='Ativo')
    is_verified = models.BooleanField(default=False, verbose_name='Verificado')
    newsletter = models.BooleanField(default=True, verbose_name='Cadastrado na Newsletter')
    date_joined = models.DateTimeField(default=timezone.now, verbose_name='Data de Criação')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome', 'sobrenome']

    objects = GerenciadorDeUsuario()

    def __str__(self) -> str:
        return f'{self.nome} {self.sobrenome} - {self.email}'

    def save(self, *args, **kwargs) -> None:
        super().save(*args, **kwargs)

        if self.foto:
            redimensionar(self.foto.name, 600)

    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
