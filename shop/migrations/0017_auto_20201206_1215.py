# Generated by Django 3.1.3 on 2020-12-06 10:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0016_auto_20201205_1148'),
    ]

    operations = [
        migrations.AddField(
            model_name='delivery',
            name='is_published',
            field=models.BooleanField(blank=True, default=True, verbose_name='опубликовано'),
        ),
        migrations.AlterField(
            model_name='order',
            name='patronym',
            field=models.CharField(blank=True, max_length=30, verbose_name='отчество'),
        ),
    ]
