# Generated by Django 3.1.3 on 2020-11-22 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_auto_20201122_1920'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='old_price',
            field=models.PositiveIntegerField(blank=True, help_text='больше, чем нынешняя', verbose_name='старая цена'),
        ),
    ]