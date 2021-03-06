from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Delivery(models.Model):
    title = models.CharField(max_length=50, verbose_name='название')
    logo = models.ImageField(upload_to='images/%Y-%m-%d/', verbose_name='логотип')
    is_published = models.BooleanField(blank=True, default=True, verbose_name='опубликовано')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'служба доставки'
        verbose_name_plural = 'службы доставки'


class OrderItem(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, verbose_name='товар')
    size = models.CharField(max_length=30, verbose_name='размер')
    color = models.CharField(max_length=30, verbose_name='цвет')
    order = models.ForeignKey('Order', on_delete=models.CASCADE, verbose_name='заказ')

    def __str__(self):
        return f'{self.product}'

    class Meta:
        verbose_name = 'единица заказа'
        verbose_name_plural = 'единицы заказа'


class Order(models.Model):

    consumer = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, verbose_name='клиент')
    last_name = models.CharField(max_length=30, verbose_name='фамилия')
    first_name = models.CharField(max_length=30, verbose_name='имя')

    phone = models.CharField(max_length=30, verbose_name='телефон')
    email = models.CharField(max_length=50, verbose_name='e-mail')
    
    region = models.CharField(max_length=50, verbose_name='область')
    district = models.CharField(max_length=50, verbose_name='район')
    city = models.CharField(max_length=50, verbose_name='город')

    delivery = models.ForeignKey(Delivery, null=True, on_delete=models.SET_NULL, verbose_name='доставка')

    adding_date = models.DateTimeField(auto_now_add=True, verbose_name='дата оформления')
    is_done = models.BooleanField(default=False, verbose_name='выполнен')

    def __str__(self):
        return f'{self.id}'

    class Meta:
        verbose_name = 'заказ'
        verbose_name_plural = 'заказы'
        ordering = ['-adding_date']


class Section(models.Model):
    slug = models.SlugField(verbose_name='слаг')
    title = models.CharField(max_length=30, help_text='мужчинам/женщинам', verbose_name='для кого')
    section_image = models.ImageField(upload_to='images/%Y-%m-%d/', verbose_name='картинка')

    class Meta:
        verbose_name='раздел'
        verbose_name_plural='разделы'
        ordering = ['pk']

    def __str__(self):
        return self.title


class Category(models.Model):
    slug = models.SlugField(verbose_name='слаг')
    section = models.ForeignKey(Section, on_delete=models.CASCADE, help_text='раздел', verbose_name='раздел')
    title = models.CharField(max_length=30, help_text='верхняя одежда/обувь/нижнее белье', verbose_name='категория')
    category_image = models.ImageField(upload_to='images/%Y-%m-%d/', verbose_name='картинка категории')
    is_published = models.BooleanField(blank=True, default=True, verbose_name='опубликовано')

    class Meta:
        verbose_name = 'категория'
        verbose_name_plural = 'категории'

    def __str__(self):
        return f'{self.title}, {self.section}'


class Subcategory(models.Model):
    slug = models.SlugField(verbose_name='слаг')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, help_text='категория', verbose_name='категория')
    title = models.CharField(max_length=30, help_text='кофты/футболки/носки', verbose_name='подкатегория')
    subcategory_image = models.ImageField(upload_to='images/%Y-%m-%d/', verbose_name='картинка подкатегории')
    is_published = models.BooleanField(blank=True, default=True, verbose_name='опубликовано')


    class Meta:
        verbose_name = 'подкатегория'
        verbose_name_plural = 'подкатегории'
        ordering = ['pk']

    def __str__(self):
        return f'{self.title} ({self.category})'


class Brand(models.Model):
    title = models.CharField(max_length=50, verbose_name='название бренда')
    country = models.CharField(max_length=50, verbose_name='страна')
    brand_image = models.ImageField(upload_to='images/%Y-%m-%d/', verbose_name='логотип бренда')

    class Meta:
        verbose_name = 'бренд'
        verbose_name_plural = 'бренды'

    def __str__(self):
        return self.title


class FeedBack(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='автор')
    product = models.ForeignKey('Product', null=True, on_delete=models.CASCADE, verbose_name='товар')
    header = models.CharField(max_length=100, null=True, verbose_name='заголовок')
    text = models.TextField(max_length=500, verbose_name='текст отзыва')
    adding_date = models.DateTimeField(auto_now_add=True, blank=True, verbose_name='дата добавления')
    update_date = models.DateTimeField(auto_now=True, blank=True, verbose_name='дата обновления')
    is_published = models.BooleanField(default=False, verbose_name='опубликован')

    class Meta:
        verbose_name = 'отзыв'
        verbose_name_plural = 'отзывы'

    def __str__(self):
        return self.text


class Size(models.Model):
    size = models.CharField(max_length=10, verbose_name='размер')

    class Meta:
        verbose_name = 'размер'
        verbose_name_plural = 'размеры'
        ordering = ['size']
    
    def __str__(self):
        return self.size


class Color(models.Model):
    color = models.CharField(max_length=30, verbose_name='цвет')

    class Meta:
        verbose_name = 'цвет'
        verbose_name_plural = 'цвета'
        ordering = ['color']

    def __str__(self):
        return self.color


class Product(models.Model):


    slug = models.SlugField(unique=True, verbose_name='слаг')
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE, verbose_name='подкатегория')
    sizes = models.ManyToManyField(Size, verbose_name='размеры')
    color = models.ManyToManyField(Color, verbose_name='цвета')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, verbose_name='бренд')

    title = models.CharField(max_length=75, help_text='макс. длина 75 символов', verbose_name='название товара')
    description = models.TextField(verbose_name='описание')
    price = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='стоимость')
    new_product = models.BooleanField(default=False, blank=True, verbose_name='новинка')
    old_price = models.PositiveIntegerField(blank=True, help_text='больше, чем нынешняя', verbose_name='старая цена')

    adding_date = models.DateTimeField(auto_now_add=True, blank=True, verbose_name='дата добавления')
    update_date = models.DateTimeField(auto_now=True, blank=True, verbose_name='дата обновления')
    # feedbacks = models.ManyToManyField(FeedBack, blank=True, verbose_name='отзывы')

    header_image = models.ImageField(upload_to='images/%Y-%m-%d/', verbose_name='главная картинка')
    image_1 = models.ImageField(blank=True, upload_to='images/%Y-%m-%d/', verbose_name='картинка 1')
    image_2 = models.ImageField(blank=True, upload_to='images/%Y-%m-%d/', verbose_name='картинка 2')
    image_3 = models.ImageField(blank=True, upload_to='images/%Y-%m-%d/', verbose_name='картинка 3')
    image_4 = models.ImageField(blank=True, upload_to='images/%Y-%m-%d/', verbose_name='картинка 4')
    image_5 = models.ImageField(blank=True, upload_to='images/%Y-%m-%d/', verbose_name='картинка 5')
    image_6 = models.ImageField(blank=True, upload_to='images/%Y-%m-%d/', verbose_name='картинка 6')

    is_published = models.BooleanField(blank=True, default=True, verbose_name='опубликовано')

    class Meta:
        verbose_name = 'товар'
        verbose_name_plural = 'товары'
        ordering = ['-update_date', '-adding_date', 'title']

    def __str__(self):
        return self.title


# TODO сделать нормальные цвета и размеры