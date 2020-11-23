from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import (
    Section,
    Category,
    Subcategory,
    Brand,
    FeedBack,
    Product,
    Size,
    Color
    )


class ProductAdminForm(forms.ModelForm):
    description = forms.CharField(label='Описание', widget=CKEditorUploadingWidget())
    
    class Meta:
        model = Product
        fields = '__all__'


class ProductModelAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    fields = (
        'subcategory',
        'sizes',
        'color',
        'brand',
        'title',
        'slug',
        'description',
        'price',
        'old_price',
        'new_product',
        'feedbacks',
        'header_image',
        'image_1',
        'image_2',
        'image_3',
        'image_4',
        'image_5',
        'image_6',
        'is_published'
    )
    list_display = ['title', 'price', 'subcategory', 'is_special_offer', 'new_product', 'is_published']
    list_display_links = ['title']
    list_editable = ['is_published', 'new_product']
    readonly_fields = ['adding_date', 'update_date']
    list_filter = ['subcategory', 'new_product', 'is_published']
    list_per_page = 25
    sortable_by = ['update_date', 'adding_date', 'title']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',), }
    

    def is_special_offer(self, obj):
        if obj.old_price > 0:
            return 'Да'
        else:
            return 'Нет'
    is_special_offer.short_description = 'есть скидка'



admin.site.register(Color)
admin.site.register(Size)
admin.site.register(Section)
admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Brand)
admin.site.register(FeedBack)
admin.site.register(Product, ProductModelAdmin)