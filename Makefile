# Atajos de tareas. Se usan con `make <objetivo>`, p. ej. `make serve`.
.PHONY: install serve build publish clean

install:   ## Instala las dependencias fijadas
	pip install -r requirements.txt

serve:     ## Servidor local con recarga automática (http://localhost:8000)
	pelican --autoreload --listen content -s pelicanconf.py -o output

build:     ## Construye el sitio (modo desarrollo)
	pelican content -s pelicanconf.py -o output

publish:   ## Construye el sitio para producción
	pelican content -s publishconf.py -o output

clean:     ## Borra artefactos generados
	rm -rf output __pycache__
