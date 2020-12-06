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
    Color,
    Delivery,
    OrderItem,
    Order
    )


class FeedBackItemInline(admin.TabularInline):
    model = FeedBack
    # raw_id_fields = ['author', 'adding_date']


class FeedBackModelAdmin(admin.ModelAdmin):
    fields = ['author', 'product', 'header', 'text', 'is_published']
    list_display = ['header', 'author', 'adding_date', 'is_published']
    list_editable = ['is_published']
    sortable_by = ['-adding_date']


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
    inlines = [FeedBackItemInline]
    

    def is_special_offer(self, obj):
        if obj.old_price > 0:
            return 'Да'
        else:
            return 'Нет'
    is_special_offer.short_description = 'есть скидка'



class OrderItemInline(admin.TabularInline):
    model = OrderItem


class OrderAdmin(admin.ModelAdmin):
    fields = [
        'consumer',
        'last_name',
        'first_name',
        'phone',
        'email',
        'region',
        'district',
        'city',
        'delivery',
        'is_done',
        ]

    list_display = ['first_name', 'phone', 'delivery', 'adding_date', 'is_done']
    list_display_links = ['first_name']
    list_editable = ['is_done']
    inlines = [OrderItemInline]
    ordering = ['-adding_date']
    sortable_by = ['is_done']
    search_fields = ['first_name', 'last_name', 'phone', 'email']


admin.site.register(Color)
admin.site.register(Size)
admin.site.register(Section)
admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Brand)
admin.site.register(FeedBack, FeedBackModelAdmin)
admin.site.register(Product, ProductModelAdmin)
admin.site.register(Delivery)
admin.site.register(OrderItem)
admin.site.register(Order, OrderAdmin)