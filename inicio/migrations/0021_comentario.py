# Generated by Django 3.1 on 2020-10-20 15:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import mptt.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('inicio', '0020_delete_comentario'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comentario',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('conteudo', models.TextField(max_length=5000, verbose_name='Conteúdo')),
                ('data', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Data do comentário')),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('comentario_pai', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='respostas', to='inicio.comentario', verbose_name='Em resposta a')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comentarios', to='inicio.post', verbose_name='Postagem')),
                ('usuario', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Usuário')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]