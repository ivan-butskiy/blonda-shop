from django.urls import path
from .views import (
    SectionListView,
    CategoriesListView,
    SubcategoriesListView,
    ProductListView,
    ProductDetailView
    )


urlpatterns = [
    path('', SectionListView.as_view()),
    path('products/<str:slug>/', ProductListView.as_view()),
    path('products/detail/<str:slug>/', ProductDetailView.as_view()),
    path('<str:slug>/', CategoriesListView.as_view()),
    path('<str:slug_section>/<str:slug_category>/', SubcategoriesListView.as_view()),
]
