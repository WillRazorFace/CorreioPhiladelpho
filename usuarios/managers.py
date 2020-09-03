from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class GerenciadorDeUsuario(BaseUserManager):
    """
    Modelo de usuário customizado onde o e-mail é um indetificador único para a autenticação ao invés do
    "username"
    """
    def create_user(self, email, password, **extra_fields):
        """
        Cria e salva um usuário com o e-mail e senha recebidos.
        """
        if not email:
            raise ValueError(_('Insira um e-mail.'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Cria e salva um superusuário com o e-mail e senha recebidos.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_verified', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Um superusuário deve ter is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Um superusuário deve ter is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)
