# Generated by Django 3.2.8 on 2021-11-14 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('laporan', '0012_alter_scientificworkreport_documentation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scientificworkreport',
            name='documentation',
            field=models.FileField(blank=True, null=True, upload_to='scientific_work_report/'),
        ),
    ]
