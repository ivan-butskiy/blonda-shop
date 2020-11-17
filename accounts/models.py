from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None, re_password=None):
        if not email:
            raise ValueError('Введите корректный e-mail адрес.') 

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)

        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, first_name, last_name, password):
        user = self.create_user(email, password, first_name, last_name)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=20, verbose_name='имя')
    last_name = models.CharField(max_length=20, verbose_name='фамилия')
    email = models.EmailField(max_length=50, unique=True, db_index=True, verbose_name='email')
    phone = models.CharField(max_length=20, blank=True, verbose_name='телефон')
    register_date = models.DateTimeField(auto_now_add=True, verbose_name='дата регистрации')
    buy_count = models.IntegerField(blank=True, default=0, verbose_name='количество покупок')
    buy_sum = models.DecimalField(max_digits=8, decimal_places=2, default=0.00, blank=True, verbose_name='сумма покупок')
    is_active = models.BooleanField(default=True, verbose_name='активен')
    is_staff = models.BooleanField(default=False, verbose_name='сотрудник')
    is_superuser = models.BooleanField(default=False, verbose_name='администратор')

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    
    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'
        ordering = ['-buy_sum']
