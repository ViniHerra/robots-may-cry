#!/usr/bin/env python
# -*- coding: utf-8 -*-
# =====================================================================
# CONFIGURACIÓN DE DESARROLLO (para trabajar en tu máquina)
# Para producción, ver publishconf.py
# =====================================================================

AUTHOR = 'Robots May Cry'
SITENAME = 'Robots May Cry'
SITESUBTITLE = 'Notas sobre máquinas, autonomía y lo que se pierde en la traducción'
SITEURL = ""

PATH = "content"                 # dónde viven tus posts
THEME = "theme/rmc"              # tu tema personalizado
TIMEZONE = 'America/Mexico_City'
DEFAULT_LANG = 'es'

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
