# Generated by Django 3.2.8 on 2021-11-29 16:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0008_remove_employee_photo'),
        ('absen', '0011_auto_20211109_1455'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('text', models.CharField(max_length=255)),
                ('is_checked', models.BooleanField(default=False)),
                ('employee_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='userauth.employee')),
            ],
        ),
    ]