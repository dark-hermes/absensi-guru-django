# Generated by Django 3.2.8 on 2021-11-14 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('laporan', '0010_alter_innovativeworkreport_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scientificworkreport',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
