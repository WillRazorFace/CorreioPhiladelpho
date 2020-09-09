from django.db import models
from usuarios.models import Usuario
from django.utils import timezone
from ckeditor.fields import RichTextField
from utils.imagens import redimensionar
import random
import string
from django.utils.text import slugify

class Categoria(models.Model):
    nome = models.CharField(max_length=100, verbose_name='Nome')

    def __str__(self) -> str:
        return self.nome

    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'


class Post(models.Model):
    usuario = models.ForeignKey(to=Usuario, on_delete=models.SET_NULL, null=True, verbose_name='Usuário')
    titulo = models.CharField(max_length=100, verbose_name='Título')
    subtitulo = models.CharField(max_length=300, verbose_name='Sub-título')
    conteudo = RichTextField(verbose_name='Conteúdo')
    foto = models.ImageField(upload_to='posts/%Y/%m/%d', blank=True, null=True, verbose_name='Imagem')
    data = models.DateTimeField(default=timezone.now, verbose_name='Data de Postagem')
    categoria = models.ForeignKey(to=Categoria, on_delete=models.SET_NULL, null=True, verbose_name='Categoria')
    destaque = models.BooleanField(default=False, verbose_name='Destaque')
    slug = models.SlugField(max_length=300, unique=True, blank=True, verbose_name='Slug')

    def __str__(self) -> str:
        return self.titulo

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titulo)

            # Se a slug já existir 4 caracteres aleatórios, dentre números e letras, serão concatenados ao final da original
            if Post.objects.filter(slug=self.slug).exists():
                self.slug = f"{self.slug}-{''.join(random.choice(string.ascii_lowercase + string.digits) for i in range(4))}"

        super().save(*args, **kwargs)

        if self.foto:
            redimensionar(self.foto.name, 800)

    class Meta:
        verbose_name = 'Publicação'
        verbose_name_plural = 'Publicações'


class Comentario(models.Model):
    usuario = models.ForeignKey(to=Usuario, on_delete=models.SET_NULL, null=True, verbose_name='Usuário')
    post = models.ForeignKey(to=Post, on_delete=models.CASCADE, verbose_name='Postagem')
    conteudo = RichTextField(verbose_name='Conteúdo')
    data = models.DateTimeField(default=timezone.now, verbose_name='Data do comentário')

    def __str__(self) -> str:
        return f'{self.usuario} - {self.post} - {self.data}'

    class Meta:
        verbose_name = 'Comentário'
        verbose_name_plural = 'Comentários'


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
