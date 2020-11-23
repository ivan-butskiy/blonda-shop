from rest_framework import serializers
from .models import (
    Section,
    Category,
    Subcategory,
    Product,
    Brand,
    Size,
    Color
    )


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


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = '__all__'


class ProductPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'slug', 'title', 'price', 'new_product', 'old_price', 'header_image', 'image_1')


class ProductDetailSerializer(serializers.ModelSerializer):

    brand = BrandSerializer(read_only=True)
    sizes = SizeSerializer(many=True, read_only=True)
    color = ColorSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
