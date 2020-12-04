from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Section,
    Category,
    Subcategory,
    Product,
    Brand,
    Size,
    Color,
    FeedBack
)


User = get_user_model()


class UserFullNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']


class FeedBackSerializer(serializers.ModelSerializer):

    author = UserFullNameSerializer(read_only=True)

    class Meta:
        model = FeedBack
        fields = '__all__'


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['color']


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['size']


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CategoryPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['slug']


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = '__all__'

class SubcategoryPreviewSerializer(serializers.ModelSerializer):

    category = CategoryPreviewSerializer(read_only=True)

    class Meta:
        model = Subcategory
        fields = ['title', 'slug', 'category']


class ProductPreviewSerializer(serializers.ModelSerializer):
    # subcategory = SubcategoryPreviewSerializer(read_only=True)


    class Meta:
        model = Product
        fields = ('id', 'slug', 'title', 'price', 'subcategory', 'new_product', 'old_price', 'header_image', 'image_1')


class ProductDetailSerializer(serializers.ModelSerializer):

    subcategory = SubcategoryPreviewSerializer(read_only=True)

    brand = BrandSerializer(read_only=True)
    sizes = SizeSerializer(many=True, read_only=True)
    color = ColorSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
