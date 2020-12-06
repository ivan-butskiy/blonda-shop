from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.settings import api_settings
from django.contrib.auth import get_user_model
from accounts.serializers import UserInfoSerializer
import json
from .serializers import (
    SectionSerializer,
    CategoryListSerializer,
    SubcategorySerializer,
    ProductPreviewSerializer,
    ProductDetailSerializer,
    SubcategoryPreviewSerializer,
    FeedBackSerializer,
    ColorsPreview,
    SizesPreview,
    BrandsPreview,
    DeliverySerializer
)

from .models import (
    Section, 
    Category, 
    Subcategory, 
    Product, 
    FeedBack, 
    Brand, 
    Color, 
    Size, 
    Delivery,
    Order,
    OrderItem
)


User = get_user_model()


class OrderRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # try:
        order = Order()

        order.last_name = request.data['consumer_data']['last_name']
        order.first_name = request.data['consumer_data']['first_name']
        order.phone = request.data['consumer_data']['phone']
        order.region = request.data['consumer_data']['region']
        order.district = request.data['consumer_data']['email']
        order.city = request.data['consumer_data']['city']

        delivery = Delivery.objects.filter(id=int(request.data['consumer_data']['choose_delivery_id']))

        if request.user.is_authenticated:
            order.consumer_id = request.user.id
            order.save()
        else:
            order.save()
        for item in request.data['products']:
            product = Product.objects.get(slug=item['slug'])

            OrderItem.objects.create(
                product=product, size=item['size'],
                color=item['color'], order=order
            )
    

        return Response({'success': 'success'})
        # except:
        #     return Response({'fail': 'fail'}, status=status.HTTP_404_NOT_FOUND)


class OrderInfoView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        queryset = {}

        if request.user.is_authenticated:
            user = User.objects.get(id=request.user.id)
            user_serializer = UserInfoSerializer(user)
            queryset.update(user=user_serializer.data)
        else:
            queryset.update(user=None)

        delivery = Delivery.objects.all()
        delivery_serializer = DeliverySerializer(delivery, many=True, context={'request': request})
        queryset.update(delivery=delivery_serializer.data)

        return Response(queryset)
    


class NewProductsView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductPreviewSerializer

    def get_queryset(self):
        new_products = Product.objects.filter(new_product=True)
        return new_products[:9] 


class FilteredProductsView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, subcategory_slug):
        subcategory = Subcategory.objects.get(slug=subcategory_slug)
        queryset = Product.objects.filter(subcategory=subcategory.pk)

        if request.data['size']:
            queryset = queryset.filter(sizes__size=request.data['size'])
        
        if request.data['color']:
            queryset = queryset.filter(color__color=request.data['color'])
        if request.data['brand']:
            queryset = queryset.filter(brand__title=request.data['brand'])
        
        if request.data['min_price']:
            queryset = queryset.filter(price__gte=int(request.data['min_price']))
        
        if request.data['max_price']:
            queryset = queryset.filter(price__lte=int(request.data['max_price']))
        
        if request.data['max_price']:
            queryset = queryset.filter(price__lte=int(request.data['max_price']))
        
        if request.data['sell']:
            queryset = queryset.filter(old_price__gt=0)
        
        if request.data['new']:
            queryset = queryset.filter(new_product=True)
        
        serializer = ProductPreviewSerializer(queryset, many=True)

        return Response(serializer.data)


class FilterInfo(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        brands = Brand.objects.all()
        colors = Color.objects.all()
        sizes = Size.objects.all()

        brands_serializer = BrandsPreview(brands, many=True)
        colors_serializer = ColorsPreview(colors, many=True)
        sizes_serializer = SizesPreview(sizes, many=True)

        return Response(
            {'colors': colors_serializer.data,
            'brands': brands_serializer.data,
            'sizes': sizes_serializer.data },
        )


class FeedBackView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, product_id):
        feedbacks = FeedBack.objects.filter(product_id=product_id, is_published=True)
        serializer = FeedBackSerializer(feedbacks, many=True)
        return Response(serializer.data)

    def post(self, request, product_id):
        try:
            product_id = request.data['id']
            feedback_header = request.data['header']
            feedback_text = request.data['text']
            
            product = Product.objects.get(id=int(product_id))
            user = request.user

            FeedBack.objects.create(author=user, product=product, header=feedback_header, text=feedback_text)

            return Response({'success': 'feedback was created'})
        except:
            return Response({'error': 'feedback not been created'})
        # TODO добавить уведомление на email Карины об отправке нового отзыва


class SectionListView(ListAPIView):
    queryset = Section.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SectionSerializer


class CategoriesListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        section = Section.objects.get(slug=slug)
        categories = Category.objects.filter(section_id=section.id, is_published=True)
        serializer = CategoryListSerializer(categories, many=True)
        return Response(serializer.data)


class SubcategoriesListView(ListAPIView):
    queryset = Subcategory.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SubcategorySerializer

    def get_queryset(self):
        category = Category.objects.get(slug=self.kwargs['slug_category'])
        subcategories = Subcategory.objects.filter(category_id=category.id, product__gt=0, is_published=True).distinct()
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


class ProductShortView(RetrieveAPIView):
    queryset = Product.objects.all()
    lookup_field = 'slug'
    permission_classes = [AllowAny]
    serializer_class = ProductPreviewSerializer


class AllProductsPreviewList(ListAPIView):
    queryset = Product.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProductPreviewSerializer

    def get_queryset(self):
        products = Product.objects.filter(is_published=True)
        return products


class SubcategoriesDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, product_slug):
        product = Product.objects.get(slug=product_slug)
        subcategory = Subcategory.objects.get(pk=product.subcategory.pk)
        serializer = SubcategoryPreviewSerializer(subcategory)
        return Response(serializer.data)