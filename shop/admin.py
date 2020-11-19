from django.contrib import admin


from .models import Section, Category, Subcategory, Brand, FeedBack, Product


admin.site.register(Section)
admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Brand)
admin.site.register(FeedBack)
admin.site.register(Product)