# Generated by Django 3.1 on 2020-10-08 13:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inicio', '0011_post_acessos'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='destaque',
        ),
    ]