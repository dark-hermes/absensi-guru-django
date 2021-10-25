# Generated by Django 3.2.8 on 2021-10-25 05:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('absen', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='password',
            field=models.CharField(max_length=255),
        ),
        migrations.CreateModel(
            name='TempImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True, null=True)),
                ('tmp_image', models.ImageField(upload_to='tmp/')),
                ('employee_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='absen.employee')),
            ],
        ),
    ]
