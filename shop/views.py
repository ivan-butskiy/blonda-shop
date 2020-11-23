from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.settings import api_settings

from .serializers import (
    SectionSerializer,
    CategoryListSerializer,
    SubcategorySerializer,
    ProductPreviewSerializer,
    ProductDetailSerializer)

from .models import Section, Category, Subcategory, Product


class SectionListView(ListAPIView):
    queryset = Section.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SectionSerializer


class SectionDetailView(RetrieveAPIView):
    lookup_field = 'slug'
    queryset = Section.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SectionSerializer


class CategoriesListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        section = Section.objects.get(slug=slug)
        categories = Category.objects.filter(section_id=section.id)
        serializer = CategoryListSerializer(categories, many=True)
        return Response(serializer.data)


class SubcategoriesListView(ListAPIView):
    queryset = Subcategory.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SubcategorySerializer

    def get_queryset(self):
        section = Section.objects.get(slug=self.kwargs['slug_section'])
        category = Category.objects.get(section_id=section.id, slug=self.kwargs['slug_category'])
        subcategories = Subcategory.objects.filter(category_id=category.id, product__gt=0).distinct()
        return subcategories


class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProductPreviewSerializer

    def get_queryset(self):
        subcategory = Subcategory.objects.get(slug=self.kwargs['slug'])
        products = Product.objects.filter(subcategory_id=subcategory.id, is_published=True)
        return products


class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    lookup_field = 'slug'
    permission_classes = [AllowAny]
    serializer_class = ProductDetailSerializer
