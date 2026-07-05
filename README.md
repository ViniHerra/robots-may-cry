# Robots May Cry

Blog construido con [Pelican](https://getpelican.com) (generador de sitios
estáticos en Python) y un tema propio: paleta industrial, tipografía IBM
Plex auto-hospedada, y un divisor "circuit trace" como elemento de firma.

---

## Puesta en marcha (primera vez)

```bash
# 1. Crea un entorno virtual aislado para el proyecto
python3 -m venv .venv
source .venv/bin/activate        # en Mac/Linux

# 2. Instala las dependencias
make install                     # equivale a: pip install -r requirements.txt

# 3. Levanta el servidor local con recarga automática
make serve
```

Abre `http://localhost:8000`. Cada vez que guardes un cambio, el sitio se
reconstruye solo; solo refresca el navegador.

---

## Escribir un post nuevo

Crea un archivo `.md` en `content/` con este encabezado:

```
Title: Mi título
Date: 2026-07-04
Category: Control
Tags: robots, ejemplo
Slug: mi-titulo
Summary: Una o dos frases que aparecen en la portada.

Aquí va el cuerpo en Markdown normal.

## Subtítulos con ##

> Citas con >
```

- **Slug** define la URL final: `robotsmaycry.com/mi-titulo/`.
- Para un **borrador** que no se publique aún, añade la línea `Status: draft`.

### Insertar imágenes o videos

Pon el archivo en `content/images/` o `content/videos/` y en el post:

```markdown
![Descripción]({static}/images/mi-imagen.png)

<video controls loop muted src="{static}/videos/mi-video.mp4"></video>
```

El `{static}` hace que Pelican calcule la ruta correcta al publicar.

---

## Cambiar el diseño

Todo lo que normalmente querrás ajustar está en un solo lugar:
`theme/rmc/static/css/style.css`, en el bloque **ZONA DE PERSONALIZACIÓN**
(cerca del inicio del archivo). Ahí están los colores y las tipografías como
variables. Cambia un valor y todo el sitio se actualiza.

Para cambiar una tipografía: coloca el archivo `.ttf` en
`theme/rmc/static/fonts/`, añade un bloque `@font-face` arriba en el CSS, y
pon su nombre en la variable correspondiente (`--display`, `--body` o
`--mono`).

---

## Publicar con tu dominio

1. Edita `publishconf.py` y cambia `SITEURL` por tu dominio real.
2. Sube el proyecto a GitHub (ver flujo de Git más abajo).
3. El flujo de `.github/workflows/deploy.yml` construye y despliega el sitio
   automáticamente en cada `push` a `main`, vía GitHub Pages. Solo tienes que
   activar Pages una vez en la configuración del repositorio (Settings →
   Pages → Source: GitHub Actions).
4. En tu proveedor de dominio, apunta los registros DNS a GitHub Pages según
   sus instrucciones.

Alternativa sin CI: `make publish` genera la carpeta `output/`, que puedes
arrastrar a [Netlify Drop](https://app.netlify.com/drop).

---

## Flujo de trabajo con Git (día a día)

```bash
git add .
git commit -m "Agrega post sobre control en lazo cerrado"
git push
```

Con el pipeline activo, ese `push` publica el sitio solo.

---

## Estructura del proyecto

```
robots-may-cry/
├── content/              # Tus posts (.md) van aquí
│   ├── pages/            #   páginas fijas (Acerca)
│   ├── images/           #   imágenes de posts
│   └── videos/           #   videos de posts (p. ej. simulaciones)
├── theme/rmc/            # Tu tema personalizado
│   ├── templates/        #   plantillas HTML
│   └── static/
│       ├── css/style.css #   TODO el diseño (edita aquí)
│       └── fonts/        #   tipografías auto-hospedadas
├── pelicanconf.py        # config de desarrollo
├── publishconf.py        # config de producción (cambia SITEURL)
├── requirements.txt      # dependencias fijadas
├── Makefile              # atajos: make serve / build / publish
├── .gitignore            # qué NO versionar
└── .github/workflows/    # despliegue automático (CI/CD)
```
