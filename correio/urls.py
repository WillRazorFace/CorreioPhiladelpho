from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('', include('inicio.urls'), name='inicio'),
    path('usuarios/', include('usuarios.urls'), name='usuarios'),
    path('professor/', include('professores.urls'), name='professores'),
    path('tinymce/', include('tinymce.urls')),
    path('sobre/', include('sobre.urls'), name='sobre'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    import debug_toolbar

    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
