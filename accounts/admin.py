from django.contrib import admin
from .models import UserAccount


class UserModelAdmin(admin.ModelAdmin):
    fields = [
        'email',
        'first_name',
        'last_name',
        'phone',
        'buy_count',
        'buy_sum',
        'is_active',
        'is_staff',
        'is_superuser'
    ]
    list_display = ['email', 'first_name', 'last_name', 'phone', 'buy_sum', 'buy_count', 'is_active']
    list_display_links = ['email']
    list_editable = ['is_active']
    sortable_by = ['buy_sum', 'buy_count']


admin.site.register(UserAccount, UserModelAdmin)