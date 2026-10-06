# Matías Pérez Dev — portfolio web

Portfolio de desarrollo web y ecommerce hecho con HTML, CSS y JavaScript puro. Incluye presentación, proyectos reales, precios orientativos y formulario por email.

## Archivos

- `index.html`: página principal y secciones.
- `styles.css`: estilos base y adaptación a celular.
- `tech.css`: identidad visual, ilustración y capturas.
- `script.js`: planes, menú, modal de proyectos y contacto.
- `assets/`: capturas de Boticario del Alma y Mar de Posibilidades.
- `LEEME.md`: guía de edición del código comentado.
- `.nojekyll`: permite publicar directamente los archivos estáticos en GitHub Pages.

## Publicación en GitHub Pages

1. Crear un repositorio llamado `matias-perez-dev`. Para usar GitHub Pages con GitHub Free, el repositorio debe ser público.
2. Subir los archivos de esta carpeta directamente a la raíz del repositorio. `index.html` debe quedar en la raíz, no dentro de otra carpeta.
3. En **Settings → Pages → Build and deployment**, seleccionar **Deploy from a branch**.
4. Elegir **main** y **/(root)**; pulsar **Save**.
5. Esperar el despliegue y abrir la dirección que muestra GitHub en **Visit site**.

El sitio utiliza rutas relativas, compatibles con la publicación en una subcarpeta de GitHub Pages.

## Formulario por email

Las consultas se procesan mediante FormSubmit y se envían a `juanmatiasperez1394@gmail.com`. Antes de compartir el sitio, hacer una prueba desde la nueva dirección pública, confirmar el correo de activación si lo solicita FormSubmit y comprobar que una segunda consulta llegue a la casilla. No se necesita publicar una contraseña de Gmail.

## Desarrollo local

Abrir la carpeta en VS Code y usar Live Server. No hay dependencias ni compilación. Las fuentes de Google Fonts requieren conexión a internet.

## Documentación

- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://formsubmit.co/help
