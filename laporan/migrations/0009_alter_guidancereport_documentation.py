# Generated by Django 3.2.8 on 2021-11-14 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('laporan', '0008_alter_guidancereport_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guidancereport',
            name='documentation',
            field=models.FileField(null=True, upload_to='guidance_report/'),
        ),
    ]
