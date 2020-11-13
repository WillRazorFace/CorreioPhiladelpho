from django.db import models
from inicio.models import Usuario


class Professor(models.Model):
    usuario = models.OneToOneField(to=Usuario, on_delete=models.CASCADE, verbose_name='Usuário', related_name='is_professor')

    def __str__(self):
        return f'{self.usuario.nome} {self.usuario.sobrenome}'

    def save(self, *args, **kwargs) -> None:
        super().save(*args, **kwargs)

        if self.usuario.is_verified == False:
            self.usuario.is_verified = True
            self.usuario.save()

    class Meta:
        verbose_name = 'Professor'
        verbose_name_plural = 'Professores'
