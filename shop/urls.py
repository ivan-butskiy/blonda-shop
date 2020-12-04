from django.urls import path
from .views import (
    SectionListView,
    CategoriesListView,
    SubcategoriesListView,
    ProductListView,
    ProductDetailView,
    AllProductsPreviewList,
    SubcategoriesDetailView,
    ProductShortView,
    FeedBackView
)


urlpatterns = [
    path('', SectionListView.as_view()),
    path('products/all/', AllProductsPreviewList.as_view()),
    path('products/feedbacks/<int:product_id>/', FeedBackView.as_view()),
    path('products/<str:slug>/', ProductListView.as_view()),
    path('products/detail/<str:slug>/', ProductDetailView.as_view()),
    path('products/short/<str:slug>/', ProductShortView.as_view()),
    path('categories/<str:slug>/', CategoriesListView.as_view()),
    path('subcategories/<str:slug_category>/', SubcategoriesListView.as_view()),
    path('subcategory/<str:product_slug>/', SubcategoriesDetailView.as_view()),
]
