#!/usr/bin/env python
# -*- coding: utf-8 -*-
# =====================================================================
# CONFIGURACIÓN DE PRODUCCIÓN (para publicar el sitio)
# Hereda todo de pelicanconf.py y solo cambia lo necesario.
# =====================================================================

import os
import sys

sys.path.append(os.curdir)
from pelicanconf import *

# >>> CAMBIA ESTO por tu dominio real cuando lo tengas conectado <<<
SITEURL = "https://robotsmaycry.com"

RELATIVE_URLS = False
DELETE_OUTPUT_DIRECTORY = True

# En producción sí generamos el feed de suscripción
FEED_ALL_ATOM = "feeds/all.atom.xml"
CATEGORY_FEED_ATOM = "feeds/{slug}.atom.xml"
