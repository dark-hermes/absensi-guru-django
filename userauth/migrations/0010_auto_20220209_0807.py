# Generated by Django 3.2.8 on 2022-02-09 01:07

from django.db import models, migrations

def user_migration(apps, schema_editor):
    Group = apps.get_model('auth', 'Group')
    Group.objects.bulk_create([
        Group(name='admin'),
        Group(name='supervisor'),
        Group(name='user')
    ])
    

class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0009_auto_20220209_0804'),
    ]

    operations = [
        migrations.RunPython(user_migration)
    ]
