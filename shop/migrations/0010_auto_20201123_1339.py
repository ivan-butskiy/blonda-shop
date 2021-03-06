# Generated by Django 3.1.3 on 2020-11-23 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0009_auto_20201123_0900'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='color',
            field=models.ManyToManyField(to='shop.Color', verbose_name='цвета'),
        ),
        migrations.AlterField(
            model_name='product',
            name='sizes',
            field=models.ManyToManyField(to='shop.Size', verbose_name='размеры'),
        ),
    ]
