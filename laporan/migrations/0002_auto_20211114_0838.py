# Generated by Django 3.2.8 on 2021-11-14 01:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('laporan', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubjectCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=16)),
            ],
        ),
        migrations.RemoveField(
            model_name='studyreport',
            name='subject',
        ),
        migrations.DeleteModel(
            name='SubjectName',
        ),
    ]
