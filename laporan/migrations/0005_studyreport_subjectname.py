# Generated by Django 3.2.8 on 2021-11-14 01:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0008_remove_employee_photo'),
        ('laporan', '0004_auto_20211114_0841'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubjectName',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject_name', models.CharField(max_length=100)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laporan.subjectcategory')),
                ('class_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laporan.classname')),
            ],
        ),
        migrations.CreateModel(
            name='StudyReport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('total_student', models.IntegerField()),
                ('presence_student', models.IntegerField()),
                ('absent_student', models.IntegerField()),
                ('documentation', models.FileField(upload_to='study_report/')),
                ('desc', models.CharField(blank=True, max_length=512, null=True)),
                ('class_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laporan.classname')),
                ('employee_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='userauth.employee')),
                ('method', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laporan.method')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laporan.subjectname')),
            ],
        ),
    ]
