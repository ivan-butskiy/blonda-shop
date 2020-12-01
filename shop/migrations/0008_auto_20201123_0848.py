# Generated by Django 3.1.3 on 2020-11-23 06:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0007_auto_20201123_0847'),
    ]

    operations = [
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.CharField(max_length=10, verbose_name='размер')),
            ],
            options={
                'verbose_name': 'размер',
                'verbose_name_plural': 'размеры',
                'ordering': ['size'],
            },
        ),
        migrations.DeleteModel(
            name='Sizes',
        ),
        migrations.AlterField(
            model_name='product',
            name='sizes',
            field=models.ManyToManyField(null=True, to='shop.Size', verbose_name='размеры'),
        ),
    ]