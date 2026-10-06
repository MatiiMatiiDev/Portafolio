# Portfolio de Matías Pérez — código completo comentado

HTML, CSS y JavaScript puro. Incluye el diseño oscuro con acentos cian/violeta, la presentación, trabajos reales, precios, contacto y footer.

## Cómo abrirlo

1. Descomprimí el ZIP.
2. Abrí la carpeta `portfolio_matias_comentado` en Visual Studio Code.
3. Abrí `index.html` en un navegador. Para trabajar con una dirección local podés usar la extensión Live Server de VS Code.
4. Conservá todos los archivos y la carpeta `assets` juntos. No necesitás instalar paquetes ni ejecutar un proceso de compilación.

Las fuentes se descargan desde Google Fonts cuando hay internet; existen tipografías de respaldo. El portapapeles puede requerir HTTPS o un servidor local; si no está disponible, el botón selecciona el mensaje para copiarlo manualmente.

## Qué contiene cada archivo

| Archivo | Función |
| --- | --- |
| `index.html` | Estructura, presentación, secciones, trabajos, formulario y ventana de detalle. |
| `styles.css` | Paleta, tipografías, diseño base, botones, tarjetas, formulario y adaptación a distintos tamaños de pantalla. |
| `tech.css` | Identidad visual de programación: gradiente, editor decorativo, tienda ilustrada y encuadre de capturas reales. Se carga después del CSS base. |
| `script.js` | Precios dinámicos, menú móvil, detalles de proyectos, canales de contacto y preparación de consultas. |
| `assets/boticario-real.jpg` | Captura real del inicio de Boticario del Alma. |
| `assets/mar-real.jpg` | Captura real del inicio de Mar de Posibilidades. |

Los comentarios `<!-- ... -->` explican las partes del HTML. Los comentarios `/* ... */` explican CSS y JavaScript. No se muestran como texto en la página.

## Dónde modificar cada parte

### Presentación y contenido

En `index.html`:

- `#inicio`: título principal, descripción y botones.
- `#sobre-mi`: biografía y especialidades.
- `#trabajos`: títulos de trabajos, capturas y descripciones breves.
- `.process`: pasos de trabajo.
- `#precios`: encabezados y aclaraciones comerciales. Las tarjetas se generan desde JavaScript.
- `#contacto`: textos, campos y opciones de proyecto.
- `footer`: marca, enlaces y créditos.

Los enlaces como `href="#contacto"` llevan a una sección con ese `id`. Conservá los identificadores que utiliza JavaScript o actualizá también sus referencias.

### Colores y tipografías

La paleta está en `:root`, al inicio de `styles.css`:

- `--bg`: fondo general.
- `--ink`: texto principal.
- `--muted`: texto secundario.
- `--green`: acento cian. El nombre se conserva de una versión anterior.
- `--violet`: segundo acento.
- `--line`: bordes y separadores.
- `--surface`: fondo de tarjetas.
- `--deep`: color alternativo para hover.

Inter se usa para texto, Space Grotesk para títulos y JetBrains Mono para etiquetas de estilo técnico. En `tech.css` también hay colores directos para la ilustración y sus ajustes. Para cambiar toda la identidad revisá ambos archivos.

Las reglas `@media` adaptan la web a notebooks, tablets y celulares. La regla `prefers-reduced-motion` respeta la preferencia de reducir movimiento.

### Precios y alcances

En `script.js`, modificá el objeto `plans`:

- `web`: landing, web institucional y catálogo con WhatsApp.
- `shop`: tienda sobre plataforma, WooCommerce y ecommerce personalizado.
- `price`: número en pesos argentinos, sin separadores ni símbolo `$`.
- `features`: lista de prestaciones.
- `featured: true`: destaca una propuesta.
- `project`: debe coincidir con el texto de una opción de `#project-select` en HTML.

`renderPlans()` construye las tarjetas. Al elegir “Me interesa” se selecciona el tipo de proyecto en el formulario. Los valores son precios iniciales editables y deben revisarse antes de presentar una propuesta comercial.

### Contacto y redes

Al inicio de `script.js`, editá `CONTACT`. Ya contiene:

- Email: `juanmatiasperez1394@gmail.com`.
- WhatsApp: `5491141622336`.

Podés agregar la dirección completa de Instagram, LinkedIn y GitHub con `https://`. Mientras estén vacíos, esos enlaces no se muestran. WhatsApp utiliza solo dígitos y formato internacional.

El formulario valida los campos y envía los datos mediante `fetch` a FormSubmit. El servicio los reenvía a tu casilla; no se abre WhatsApp ni el correo del visitante. El botón de envío se desactiva mientras espera y no se reintenta automáticamente para evitar duplicados. Si falla, los campos se conservan y el visitante puede copiar o descargar su consulta. Una respuesta exitosa confirma recepción por FormSubmit, no entrega en Gmail.

**Activación necesaria (una vez):**

1. Abrí el sitio desde el dominio publicado o desde un servidor local como Live Server. El envío no debe probarse abriendo un archivo `file://`.
2. Enviá una consulta de prueba desde el formulario.
3. Revisá `juanmatiasperez1394@gmail.com`, incluidos spam y promociones, y confirmá el correo de FormSubmit.
4. Después de confirmar, repetí una consulta y comprobá que llegue con nombre, email, marca, tipo de proyecto y mensaje.

El envío usa un servicio externo que procesa los datos del formulario. No hay contraseñas ni claves de Gmail en el código. `_replyto` permite responder al email del visitante. El campo `_honey` es una trampa antispam invisible que debe permanecer vacío. Al cambiar el destinatario, actualizá `CONTACT.email` y el atributo `action` del formulario en HTML; el nuevo email requiere activación.

Documentación: https://formsubmit.co/ajax-documentation y https://formsubmit.co/help.

### Trabajos reales

Cada tarjeta tiene `data-project="boticario"` o `data-project="mar"`. Esa clave coincide con el objeto `projects` en JavaScript y con el nombre de la captura.

Para reemplazar un proyecto, cambiá la tarjeta del HTML, los datos en `projects` y la imagen correspondiente en `assets`. Ajustá también su texto alternativo `alt`. Al abrir una tarjeta, el diálogo muestra la captura completa y los detalles.

### Ilustración del inicio

La escena `.dev-scene` está hecha con elementos HTML y CSS. El editor, los auriculares y el botón “Comprar” son una ilustración; no funcionan como editor ni tienda. Podés modificar sus tamaños y colores en `tech.css`.

## Publicarla en tu hosting

Subí `index.html`, los dos CSS, `script.js` y `assets/` a la carpeta pública de tu dominio (por ejemplo `public_html`), manteniendo las rutas. No hace falta subir este LEEME.

Esta entrega es una copia comentada para descargar y editar. No contiene credenciales, archivos Git ni configuración interna del alojamiento actual. Se corrigió un fragmento sobrante en la importación de fuentes del CSS durante la preparación de la copia.

## Verificación realizada

Se comprobó la sintaxis de JavaScript, la conservación de etiquetas y atributos del HTML y la existencia de los archivos referenciados. Se comparó la generación de ambos grupos de planes y el contenido de los proyectos con la versión original. Para el envío de email se comprobaron con respuestas simuladas: payload y destinatario, recepción por el servicio, fallos HTTP/JSON, timeout, bloqueo de doble clic, antispam y validación. La activación y entrega real en Gmail quedan pendientes de tu confirmación y de una prueba desde el dominio. Esta entrega no incluye una nueva prueba visual en navegador de la copia comentada.
