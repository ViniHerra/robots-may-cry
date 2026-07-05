# Atajos de tareas comunes. Se ejecutan con `make <objetivo>`, p. ej. `make serve`.
# Ventaja profesional: el mismo comando funciona igual para ti, un colaborador
# o el servidor de CI. Nadie tiene que recordar los flags de Pelican.

.PHONY: install serve build publish clean

install:            ## Instala las dependencias fijadas
	pip install -r requirements.txt

serve:              ## Servidor local con recarga automática en http://localhost:8000
	pelican --autoreload --listen content -s pelicanconf.py -o output

build:              ## Construye el sitio (modo desarrollo)
	pelican content -s pelicanconf.py -o output

publish:            ## Construye el sitio para producción (URLs absolutas)
	pelican content -s publishconf.py -o output

clean:              ## Borra artefactos generados
	rm -rf output __pycache__
