from django.db import models


class Section(models.Model):
    title = models.CharField(max_length=30, verbose_name='для кого')
    # description = models.CharField(max_length=50, verbose_name='описание')