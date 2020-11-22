from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Section(models.Model):
    slug = models.SlugField(verbose_name='слаг')
    title = models.CharField(max_length=30, help_text='мужчинам/женщинам', verbose_name='для кого')
    section_image = models.ImageField(upload_to='images/%Y-%m-%d/', verbose_name='картинка')

    class Meta:
        verbose_name='раздел'
        verbose_name_plural='разделы'

    def __str__(self):
        return self.title


class Category(models.Model):
    slug = models.SlugField(verbose_name='слаг')
    section = models.ForeignKey(Section, on_delete=models.CASCADE, help_text='раздел', verbose_name='раздел')
    title = models.CharField(max_length=30, help_text='верхняя одежда/обувь/нижнее белье', verbose_name='категория')
    category_image = models.ImageField(upload_to='images/%Y-%m-%d/', verbose_name='картинка категории')

    class Meta:
        verbose_name = 'категория'
        verbose_name_plural = 'категории'

    def __str__(self):
        return self.title


class Subcategory(models.Model):
    slug = models.SlugField(verbose_name='слаг')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, help_text='категория', verbose_name='категория')
    title = models.CharField(max_length=30, help_text='кофты/футболки/носки', verbose_name='подкатегория')
    subcategory_image = models.ImageField(upload_to='images/%Y-%m-%d/', verbose_name='картинка подкатегории')


    class Meta:
        verbose_name = 'подкатегория'
        verbose_name_plural = 'подкатегории'

    def __str__(self):
        return self.title


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
    text = models.TextField(max_length=500, verbose_name='текст отзыва')
    adding_date = models.DateTimeField(auto_now_add=True, blank=True, verbose_name='дата добавления')
    update_date = models.DateTimeField(auto_now=True, blank=True, verbose_name='дата обновления')

    class Meta:
        verbose_name = 'отзыв'
        verbose_name_plural = 'отзывы'

    def __str__(self):
        return self.text


class Product(models.Model):

    SIZES = (
        ('Одежда',(
            ('XS', 'XS'),
            ('S', 'S'),
            ('M', 'M'),
            ('L', 'L'),
            ('XL', 'XL'),
            ('XXL', 'XXL'),
            ('XXL', 'XXL'),
            ('XXXL', 'XXXL')
            )
        ),
        ('Обувь',(
            ('33,5', '33,5'),
            ('34,5', '34,5'),
            ('35', '35'),
            ('35,5', '35,5'),
            ('36', '36'),
            ('36,5', '36,5'),
            ('37', '37'),
            ('37,5', '37,5'),
            ('38', '38'),
            ('38,5', '38,5'),
            ('39', '39'),
            ('39,5', '39,5'),
            ('40', '40'),
            ('40,5', '40,5'),
            ('41', '41'),
            ('41,5', '41,5'),
            ('42', '42'),
            ('42,5', '42,5'),
            ('43', '43'),
            ('43,5', '43,5'),
            ('44', '44'),
            ('44,5', '44,5'),
            ('45', '45'),
            ('45,5', '45,5'),
            ('46', '46'),
            ('46,5', '46,5'),
            ('47', '47'),
            ('47,5', '47,5'),
            ('48', '48'),
            ('48,5', '48,5'),
            ('49', '49'),
            ('49,5', '49,5'),
            ('50', '50')
            )
        )
    )

    slug = models.SlugField(unique=True, verbose_name='слаг')
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE, verbose_name='подкатегория')
    sizes = models.CharField(max_length=50, choices=SIZES, verbose_name='размеры')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, verbose_name='бренд')

    title = models.CharField(max_length=75, help_text='макс. длина 75 символов', verbose_name='название товара')
    description = models.TextField(verbose_name='описание')
    price = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='стоимость')
    new_product = models.BooleanField(default=False, blank=True, verbose_name='новинка')
    old_price = models.PositiveIntegerField(blank=True, help_text='больше, чем нынешняя', verbose_name='старая цена')

    adding_date = models.DateTimeField(auto_now_add=True, blank=True, verbose_name='дата добавления')
    update_date = models.DateTimeField(auto_now=True, blank=True, verbose_name='дата обновления')
    feedbacks = models.ManyToManyField(FeedBack, blank=True, verbose_name='отзывы')

    header_image = models.ImageField(upload_to='images/%Y-%m-%d/', verbose_name='главная картинка')
    image_1 = models.ImageField(blank=True, upload_to='images/%Y-%m-%d/', verbose_name='картинка 1')
    image_2 = models.ImageField(blank=True, upload_to='images/%Y-%m-%d/', verbose_name='картинка 2')
    image_3 = models.ImageField(blank=True, upload_to='images/%Y-%m-%d/', verbose_name='картинка 3')
    image_4 = models.ImageField(blank=True, upload_to='images/%Y-%m-%d/', verbose_name='картинка 4')
    image_5 = models.ImageField(blank=True, upload_to='images/%Y-%m-%d/', verbose_name='картинка 5')
    image_6 = models.ImageField(blank=True, upload_to='images/%Y-%m-%d/', verbose_name='картинка 6')

    is_published = models.BooleanField(blank=True, null=True, default=True, verbose_name='опубликован')

    class Meta:
        verbose_name = 'товар'
        verbose_name_plural = 'товары'
        ordering = ['-update_date', 'title']

    def __str__(self):
        return self.title


# TODO сделать нормальные цветы и размеры