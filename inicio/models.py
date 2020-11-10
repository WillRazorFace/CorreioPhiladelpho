from django.db import models
from usuarios.models import Usuario
from django.utils import timezone
from mptt.models import MPTTModel, TreeForeignKey
from tinymce.models import HTMLField
from utils.imagens import redimensionar
import random
import string
from django.utils.text import slugify
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings


class Categoria(models.Model):
    nome = models.CharField(max_length=100, verbose_name='Nome', unique=True)

    def __str__(self) -> str:
        return self.nome

    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'


class Post(models.Model):
    usuario = models.ForeignKey(to=Usuario, on_delete=models.SET_NULL, null=True, verbose_name='Usuário')
    titulo = models.CharField(max_length=100, verbose_name='Título')
    subtitulo = models.CharField(max_length=300, verbose_name='Sub-título')
    conteudo = HTMLField(verbose_name='Conteúdo', blank=False, null=False)
    acessos = models.IntegerField(verbose_name='Acessos', default=0)
    foto = models.ImageField(upload_to='posts/%Y/%m/%d', blank=True, null=True, verbose_name='Imagem')
    data = models.DateTimeField(default=timezone.now, verbose_name='Data de Postagem')
    categoria = models.ForeignKey(to=Categoria, on_delete=models.SET_NULL, null=True, verbose_name='Categoria')
    slug = models.SlugField(max_length=300, unique=True, blank=True, verbose_name='Slug')
    curtidas = models.ManyToManyField(to=Usuario, related_name='posts_curtidos', blank=True)

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


@receiver(post_save, sender=Post)
def enviar_email_newsletter(sender, instance, created, **kwargs):
    if created:
        usuarios = Usuario.objects.all().filter(newsletter=True)
        emails = []

        for usuario in usuarios:
            emails.append(usuario.email)

        template_newsletter_txt = render_to_string(
            'inicio/email/novo-post.txt',
            {
                'protocolo': getattr(settings, 'PROTOCOLO'),
                'dominio': getattr(settings, 'DOMINIO'),
                'post': instance,
            }
        )

        template_newsletter_html = render_to_string(
            'inicio/email/novo-post.html',
            {
                'protocolo': getattr(settings, 'PROTOCOLO'),
                'dominio': getattr(settings, 'DOMINIO'),
                'post': instance,
            }
        )

        send_mail(
            f'{instance.titulo} - Correio Philadelpho',
            template_newsletter_txt,
            'naoresponda@philadelpho.com.br',
            emails,
            html_message=template_newsletter_html
        )


class Comentario(MPTTModel):
    usuario = models.ForeignKey(to=Usuario, on_delete=models.SET_NULL, null=True, verbose_name='Usuário', related_name='comentarios')
    post = models.ForeignKey(to=Post, on_delete=models.CASCADE, verbose_name='Postagem', related_name='comentarios')
    conteudo = models.TextField(verbose_name='Conteúdo', max_length=5000)
    data = models.DateTimeField(default=timezone.now, verbose_name='Data do comentário')
    comentario_pai = TreeForeignKey('self', on_delete=models.CASCADE, null=True,
                                       blank=True, verbose_name='Em resposta a', related_name='respostas')
    aprovado = models.BooleanField(default=False, verbose_name='Aprovado')

    def __str__(self) -> str:
        return f'"{self.conteudo}" - {self.post}'

    class MPTTMeta:
        order_insertion_by = ['data']
        parent_attr = 'comentario_pai'

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
