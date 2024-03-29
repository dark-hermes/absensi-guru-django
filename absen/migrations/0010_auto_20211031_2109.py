# Generated by Django 3.2.8 on 2021-10-31 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('absen', '0009_delete_tempimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='presence',
            name='checkin_desc',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='presence',
            name='checkin_img',
            field=models.ImageField(blank=True, null=True, upload_to='checkin/'),
        ),
        migrations.AlterField(
            model_name='presence',
            name='checkin_time',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='presence',
            name='checkout_desc',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='presence',
            name='checkout_img',
            field=models.ImageField(blank=True, null=True, upload_to='checkout/'),
        ),
        migrations.AlterField(
            model_name='presence',
            name='checkout_time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
