# Generated by Django 3.1.3 on 2020-12-03 05:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0012_feedback_header'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='is_published',
            field=models.BooleanField(default=False, null=True, verbose_name='опубликован'),
        ),
    ]