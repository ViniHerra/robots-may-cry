#!/usr/bin/env python
# -*- coding: utf-8 -*-
# =====================================================================
# CONFIGURACIÓN DE DESARROLLO (para trabajar en tu máquina)
# Para producción, ver publishconf.py
# =====================================================================

AUTHOR = 'Vinicio Hernández'
SITENAME = 'Memento Robot'
SITESUBTITLE = 'Ingeniería, desarmada'
SITEURL = ""

PATH = "content"                 # dónde viven tus posts
THEME = "theme/rmc"              # tu tema personalizado

# Versión del diseño. Súbela (por ejemplo a '2026.11.09') cada vez que cambies
# el CSS o el JavaScript: así los navegadores de tus lectores descargan la
# versión nueva en lugar de usar la vieja que tenían guardada.
THEME_VERSION = '2026.11.08.4'
TIMEZONE = 'America/Mexico_City'
DEFAULT_LANG = 'es'           # idioma por defecto; un post en inglés lleva 'Lang: en'

# Menú de navegación (arriba a la derecha)
MENUITEMS = (
   ('Ensayos', '/category/ensayos.html'),
    ('Bitácora', '/bitacora/'),
    ('Laboratorio', '/laboratorio/'),
    ('Acerca', '/about/'),
)

# URLs limpias: robotsmaycry.com/mi-post/  en vez de  /mi-post.html
ARTICLE_URL = '{slug}/'
ARTICLE_SAVE_AS = '{slug}/index.html'
PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'

# Posts y páginas en otro idioma (por ejemplo 'Lang: en'): robotsmaycry.com/en/mi-post/
ARTICLE_LANG_URL = '{lang}/{slug}/'
ARTICLE_LANG_SAVE_AS = '{lang}/{slug}/index.html'
PAGE_LANG_URL = '{lang}/{slug}/'
PAGE_LANG_SAVE_AS = '{lang}/{slug}/index.html'

# Carpetas de archivos estáticos (imágenes y videos de tus posts)
STATIC_PATHS = ['images', 'videos', 'interactivos', 'extra/CNAME']
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'}}
ARTICLE_EXCLUDES = ['interactivos']
PAGE_EXCLUDES = ['interactivos']

DEFAULT_PAGINATION = 8

# Feeds desactivados en desarrollo (se activan en producción)
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

RELATIVE_URLS = True
