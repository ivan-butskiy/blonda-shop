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
    FeedBackView,
    FilterInfo,
    FilteredProductsView,
    NewProductsView,
    OrderInfoView,
    OrderRegisterView
)


urlpatterns = [
    path('', SectionListView.as_view()),
    path('filtered-products/<str:subcategory_slug>/', FilteredProductsView.as_view()),
    path('filterinfo/', FilterInfo.as_view()),
    path('order/register/', OrderRegisterView.as_view()),
    path('order/info/', OrderInfoView.as_view()),
    path('products/new/', NewProductsView.as_view()),
    # path('products/sell/', ),
    path('products/all/', AllProductsPreviewList.as_view()),
    path('products/feedbacks/<int:product_id>/', FeedBackView.as_view()),
    path('products/<str:slug>/', ProductListView.as_view()),
    path('products/detail/<str:slug>/', ProductDetailView.as_view()),
    path('products/short/<str:slug>/', ProductShortView.as_view()),
    path('categories/<str:slug>/', CategoriesListView.as_view()),
    path('subcategories/<str:slug_category>/', SubcategoriesListView.as_view()),
    path('subcategory/<str:product_slug>/', SubcategoriesDetailView.as_view()),
]
