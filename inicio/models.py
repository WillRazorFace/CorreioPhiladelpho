from django.db import models
from usuarios.models import Usuario
from django.utils import timezone


class Feedback(models.Model):
    usuario = models.ForeignKey(to=Usuario, on_delete=models.SET_NULL, null=True, verbose_name='Usuário')
    email = models.EmailField(verbose_name='Endereço de e-mail')
    feedback = models.TextField(max_length=5000, verbose_name='Feedback')
    data = models.DateTimeField(default=timezone.now, verbose_name='Data de envio')

    def __str__(self) -> str:
        return f'{self.email} - {self.data}'

    class Meta:
        verbose_name = 'Feedback'
        verbose_name_plural = 'Feedbacks'
