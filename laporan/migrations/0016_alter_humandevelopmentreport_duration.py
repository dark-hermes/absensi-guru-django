# Generated by Django 3.2.8 on 2021-11-16 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('laporan', '0015_humandevelopmentreport_held_on'),
    ]

    operations = [
        migrations.AlterField(
            model_name='humandevelopmentreport',
            name='duration',
            field=models.DecimalField(decimal_places=2, max_digits=4),
        ),
    ]
