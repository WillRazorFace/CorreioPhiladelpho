# Generated by Django 3.1 on 2020-10-20 00:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inicio', '0014_auto_20201019_2059'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comentario',
            name='conteudo',
            field=models.TextField(max_length=1500, verbose_name='Conteúdo'),
        ),
    ]
