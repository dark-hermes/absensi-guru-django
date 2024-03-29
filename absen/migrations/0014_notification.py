# Generated by Django 3.2.8 on 2021-12-19 13:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0008_remove_employee_photo'),
        ('absen', '0013_delete_notification'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=50, null=True)),
                ('desc', models.CharField(blank=True, max_length=200, null=True)),
                ('is_checked', models.BooleanField(default=False)),
                ('employee_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='userauth.employee')),
            ],
        ),
    ]
