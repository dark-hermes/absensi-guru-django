# Generated by Django 3.2.8 on 2021-11-14 01:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('laporan', '0003_subjectname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subjectname',
            name='category_name',
        ),
        migrations.RemoveField(
            model_name='subjectname',
            name='class_name',
        ),
        migrations.DeleteModel(
            name='StudyReport',
        ),
        migrations.DeleteModel(
            name='SubjectName',
        ),
    ]