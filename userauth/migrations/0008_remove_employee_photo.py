# Generated by Django 3.2.8 on 2021-10-28 01:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0007_auto_20211028_0805'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='photo',
        ),
    ]