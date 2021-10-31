# Generated by Django 3.2.8 on 2021-10-28 01:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0006_alter_days_employee_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='photo',
            field=models.ImageField(null=True, upload_to='profile/'),
        ),
        migrations.AlterField(
            model_name='days',
            name='employee_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='userauth.employee'),
        ),
    ]
