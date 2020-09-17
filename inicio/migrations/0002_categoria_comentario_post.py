# Generated by Django 3.1 on 2020-09-09 12:46

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('inicio', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100, verbose_name='Nome')),
            ],
            options={
                'verbose_name': 'Categoria',
                'verbose_name_plural': 'Categorias',
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=100, verbose_name='Título')),
                ('subtitulo', models.CharField(max_length=300, verbose_name='Sub-título')),
                ('conteudo', ckeditor.fields.RichTextField(verbose_name='Conteúdo')),
                ('foto', models.ImageField(blank=True, null=True, upload_to='posts/%Y/%m/%d', verbose_name='Imagem')),
                ('data', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Data de Postagem')),
                ('categoria', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='inicio.categoria', verbose_name='Categoria')),
                ('usuario', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Usuário')),
            ],
            options={
                'verbose_name': 'Publicação',
                'verbose_name_plural': 'Publicações',
            },
        ),
        migrations.CreateModel(
            name='Comentario',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('conteudo', ckeditor.fields.RichTextField(verbose_name='Conteúdo')),
                ('data', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Data do comentário')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inicio.post', verbose_name='Postagem')),
                ('usuario', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Usuário')),
            ],
            options={
                'verbose_name': 'Comentário',
                'verbose_name_plural': 'Comentários',
            },
        ),
    ]