/* DATOS DE CONTACTO: email y WhatsApp ya están configurados. Para mostrar Instagram, LinkedIn o GitHub agregá la URL completa con https://. Vacío significa que ese enlace no se muestra. WhatsApp usa código de país y número, sin + ni espacios. */

const CONTACT =  {
  email: 'juanmatiasperez1394@gmail.com',
  whatsapp: '5491141622336',
  instagram: '',
  linkedin: '',
  github: ''
};

/* PLANES Y PRECIOS: web agrupa presentación, institucional y catálogo; shop agrupa tiendas. price se expresa en pesos argentinos. featured destaca un plan. project debe coincidir con una opción del select del formulario. Estas cifras son valores iniciales editables; no calculan un presupuesto personalizado. */

const plans =  {
  web: [ {
    name: 'Landing',
    label: 'PARA EMPEZAR',
    price: 450000,
    description: 'Tu presentación, tus servicios y una forma simple de recibir consultas.',
    features: ['Una página · hasta 6 secciones', 'Formulario y enlace a WhatsApp', 'Diseño adaptado a tu marca', 'Entrega estimada: 1–2 semanas'],
    project: 'Landing'
  },  {
    name: 'Web institucional',
    label: 'MÁS ESPACIO PARA TU MARCA',
    price: 700000,
    description: 'Para contar quién sos y mostrar tus servicios con más profundidad.',
    features: ['Hasta 5 páginas', 'Servicios, sobre nosotros y contacto', 'SEO inicial y diseño responsive', 'Entrega estimada: 2–3 semanas'],
    project: 'Web institucional',
    featured: true
  },  {
    name: 'Catálogo con WhatsApp',
    label: 'PARA MOSTRAR Y VENDER',
    price: 750000,
    description: 'Tus productos ordenados, con pedidos que se cierran por WhatsApp.',
    features: ['Hasta 30 productos simples', 'Categorías y fichas de producto', 'Pedidos por WhatsApp · sin pago online', 'Entrega estimada: 2–3 semanas'],
    project: 'Catálogo con WhatsApp'
  }],
  shop: [ {
    name: 'Tienda inicial',
    label: 'UNA BASE PARA EMPEZAR',
    price: 550000,
    description: 'Configuración de tu tienda sobre una plataforma como Tiendanube o Empretienda.',
    features: ['Diseño sobre plantilla', 'Carga de hasta 20 productos simples', 'Pagos y envíos estándar', 'Plan de plataforma no incluido'],
    project: 'Tienda sobre plataforma'
  },  {
    name: 'Tienda WooCommerce',
    label: 'TU TIENDA, LISTA PARA VENDER',
    price: 1200000,
    description: 'Una experiencia de compra completa para organizar productos, stock y pedidos.',
    features: ['Hasta 30 productos simples', 'Carrito y Mercado Pago', 'Una integración de envío estándar', 'Entrega estimada: 3–5 semanas'],
    project: 'Tienda WooCommerce',
    featured: true
  },  {
    name: 'Ecommerce a tu medida',
    label: 'DISEÑO CON IDENTIDAD',
    price: 1800000,
    description: 'Para marcas que buscan una tienda con un diseño más personalizado.',
    features: ['Diseño visual propio', 'Hasta 50 productos simples', 'Cuenta, carrito, pagos y analítica', 'Entrega estimada: 5–8 semanas'],
    project: 'Ecommerce personalizado'
  }]
};

/* FORMATO DE MONEDA: convierte 450000 a 450.000 usando el formato argentino, sin decimales. */

const money = new Intl.NumberFormat('es-AR',  {
  maximumFractionDigits: 0
});

/* RENDERIZAR PLANES: vacía #plan-list y crea una tarjeta por propuesta. innerHTML usa solo los datos de plans escritos en este archivo. Si se incorporan datos externos, sanitizalos antes de insertarlos. El enlace elige el tipo de proyecto en el formulario y baja a contacto. */

function renderPlans(type) {
  const panel = document.querySelector('#plan-list');
  panel.replaceChildren();
  for(const plan of plans[type]) {
    const card = document.createElement('article');
    card.className = 'plan' + (plan.featured?' featured': '');
    card.innerHTML = `<div class="plan-label">${plan.label}</div><h3>${plan.name}</h3><p>${plan.description}</p><div class="plan-price"><small>DESDE · ARS</small><span class="currency">$</span>${money.format(plan.price)}</div><ul>${plan.features.map(f=>`<li>${f}</li>`).join('')}</ul><a class="button" href="#contacto">Me interesa <span>↗</span></a>`;
    card.querySelector('a').addEventListener('click', () =>  {
      document.querySelector('#project-select').value = plan.project;
    });
    panel.append(card);
  }
}

/* PESTAÑAS ACCESIBLES: seleccionan el grupo web/shop. aria-selected informa cuál está activa; tabindex permite acceder con teclado. */

const tabs = [...document.querySelectorAll('[data-tab]')];

/* CAMBIAR PESTAÑA: actualiza accesibilidad, vincula el panel a su título y dibuja los nuevos planes. */

function selectTab(tab) {
  for(const t of tabs) {
    const selected = t === tab;
    t.setAttribute('aria-selected', String(selected));
    t.tabIndex = selected?0: -1;
  }
  document.querySelector('#plan-list').setAttribute('aria-labelledby', tab.id);
  renderPlans(tab.dataset.tab);
}

/* EVENTOS DE PESTAÑAS: clic, flechas izquierda/derecha, Home y End. Al iniciar se muestran los planes web. */

for(const tab of tabs) {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event =>  {
    if(!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key))return;
    event.preventDefault();
    const next = event.key === 'Home'?tabs[0]: event.key === 'End'?tabs.at(-1): tabs[(tabs.indexOf(tab) + 1)%tabs.length];
    selectTab(next);
    next.focus();
  });
}
renderPlans('web');

/* MENÚ MÓVIL: .open controla la visibilidad mediante CSS; aria-expanded y aria-label informan el estado al lector de pantalla. */

const toggle = document.querySelector('.menu-toggle'), nav = document.querySelector('#navigation');

/* CERRAR MENÚ: restaura la clase y las etiquetas. También se ejecuta al elegir una sección o pulsar Escape. */

function closeMenu() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menú');
}
toggle.addEventListener('click', () =>  {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open?'Cerrar menú': 'Abrir menú');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e =>  {
  if(e.key === 'Escape')closeMenu();
});

/* DATOS DEL PORTFOLIO: las claves boticario y mar coinciden con data-project en HTML y con assets/boticario-real.jpg y assets/mar-real.jpg. Editá aquí los títulos, descripciones y prestaciones que muestra el modal. */

const projects =  {
  boticario:  {
    title: 'Boticario del Alma',
    type: 'ECOMMERCE · WORDPRESS · PROYECTO EN DESARROLLO',
    description: 'Rediseño de una tienda de productos botánicos. El trabajo busca llevar la identidad sensorial de la marca a una experiencia de compra clara y consistente.',
    features: ['Diseño de páginas de inicio, tienda, presentación y contacto.', 'Adaptación a dispositivos móviles.', 'Catálogo por categorías y trabajo sobre cuenta y carrito.', 'Formulario de contacto y enlaces a WhatsApp.', 'Captura real de la portada del sitio.']
  },
  mar:  {
    title: 'Mar de Posibilidades',
    type: 'LANDING · SERVICIOS · PROYECTO REAL',
    description: 'Una página de presentación para Romi, con espacio para explicar su propuesta, sus servicios y facilitar el contacto.',
    features: ['Secciones de inicio, sobre mí, servicios y contacto.', 'Identidad visual en tonos azules y dorados.', 'Contacto por email, WhatsApp y agenda.', 'Adaptación a celular y configuración inicial para buscadores.', 'Captura real de la portada del sitio.']
  }
};

/* ABRIR DETALLE: identifica la tarjeta, carga su captura y completa los textos con textContent. showModal() gestiona la ventana nativa y el foco. El botón X, Escape (comportamiento del navegador) y un clic fuera permiten cerrarla. */

const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () =>  {
  const p = projects[button.dataset.project];
  const image = document.querySelector('#dialog-image');
  image.src = 'assets/' + button.dataset.project + '-real.jpg';
  image.alt = 'Captura real del inicio de ' + p.title;
  document.querySelector('#dialog-title').textContent = p.title;
  document.querySelector('#dialog-type').textContent = p.type;
  document.querySelector('#dialog-description').textContent = p.description;
  const list = document.querySelector('#dialog-features');
  list.replaceChildren(...p.features.map(f =>  {
    const li = document.createElement('li');
    li.textContent = f;
    return li;
  }));
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e =>  {
  if(e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if(e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom)dialog.close();
  }
});
document.querySelector('#dialog-contact').addEventListener('click', () => dialog.close());

/* CANALES DE CONTACTO: enlaces del bloque de contacto y footer generados a partir de CONTACT. */

const channels = document.querySelector('#contact-channels'), socials = document.querySelector('#footer-socials');

/* CREAR ENLACES: mailto abre el correo; WhatsApp y redes abren otra pestaña. noopener y noreferrer protegen la relación con la pestaña externa. */

function link(label, url, parent) {
  const a = document.createElement('a');
  a.textContent = label + ' ↗';
  a.href = url;
  if(!url.startsWith('mailto:')) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }
  parent.append(a);
}

/* WHATSAPP: conserva solo dígitos. Si falta el número se utiliza email; las redes solo se agregan cuando tienen una URL https://. */

const phone = CONTACT.whatsapp.replace(/\D/g, '');
if(phone) {
  link('WhatsApp', 'https://wa.me/' + phone, channels);
  link('WhatsApp', 'https://wa.me/' + phone, socials);
}
if(CONTACT.email) {
  link(CONTACT.email, 'mailto:' + CONTACT.email, channels);
  link('Email', 'mailto:' + CONTACT.email, socials);
}
for(const[key, label]of[['instagram', 'Instagram'], ['linkedin', 'LinkedIn'], ['github', 'GitHub']])if(CONTACT[key] && /^https:\/\//.test(CONTACT[key]))link(label, CONTACT[key], socials);

/* FORMULARIO POR EMAIL: FormSubmit recibe la consulta y la reenvía a CONTACT.email.
   Activación: el primer envío genera un correo de verificación para el destinatario.
   Confirmá ese correo una vez antes de habilitar el formulario para clientes.
   El servicio acepta la petición; la entrega final depende de la activación y del correo.
   Documentación: https://formsubmit.co/ajax-documentation */
const contactForm = document.querySelector('#contact-form');
const submitButton = document.querySelector('#submit-button');
const resultPanel = document.querySelector('#form-result');
const resultStatus = document.querySelector('#result-status');
const preparedBox = document.querySelector('#prepared-message');
const resultActions = document.querySelector('.result-actions');
let prepared = '';
let sending = false;

contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (sending || !contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  // Campo invisible antispam: los visitantes no necesitan completarlo.
  if (String(data.get('_honey') || '').trim()) return;
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const brand = String(data.get('brand') || '').trim();
  const project = String(data.get('project') || 'Todavía no lo sé');
  const message = String(data.get('message') || '').trim();
  prepared = `Hola Matías, me gustaría consultar por una web.\n\nNombre: ${name}\nEmail: ${email}\nMarca: ${brand || 'A definir'}\nProyecto: ${project}\n\n${message}`;
  preparedBox.value = prepared;
  preparedBox.hidden = true;
  resultActions.hidden = true;
  resultPanel.hidden = false;
  resultPanel.dataset.state = 'pending';
  resultStatus.textContent = 'Enviando tu consulta…';
  sending = true;
  submitButton.disabled = true;
  submitButton.textContent = 'Enviando…';
  contactForm.setAttribute('aria-busy', 'true');
  // Timeout: no reintentamos automáticamente para evitar duplicar consultas.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch('https://formsubmit.co/ajax/' + encodeURIComponent(CONTACT.email), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        name, email,
        Marca: brand || 'A definir', Proyecto: project, message,
        _subject: 'Consulta web · ' + (brand || name),
        _replyto: email,
        _template: 'table',
        _captcha: 'false',
        _honey: '',
        _url: window.location.href.split('#')[0]
      })
    });
    const result = await response.json();
    if (!response.ok || (result.success !== true && result.success !== 'true')) {
      throw new Error('El servicio no confirmó la recepción.');
    }
    // Confirmar recepción de la petición no equivale a comprobar la entrega en Gmail.
    resultPanel.dataset.state = 'success';
    resultStatus.textContent = 'Tu consulta fue recibida para enviarla por email. ¡Gracias por escribirme!';
    contactForm.reset();
  } catch (error) {
    resultPanel.dataset.state = 'error';
    resultStatus.textContent = error.name === 'AbortError'
      ? 'El envío tardó más de lo esperado y no pudimos confirmarlo. Tu mensaje sigue aquí: podés copiarlo o descargarlo antes de reintentar.'
      : 'No pudimos confirmar el envío. Tus datos siguen aquí: intentá nuevamente o escribime al email indicado.';
    preparedBox.hidden = false;
    resultActions.hidden = false;
  } finally {
    clearTimeout(timeout);
    sending = false;
    submitButton.disabled = false;
    submitButton.innerHTML = 'Enviar consulta por email <span>↗</span>';
    contactForm.setAttribute('aria-busy', 'false');
  }
});

/* COPIAR Y DESCARGAR: opciones de respaldo si el servicio no confirma el envío. */
document.querySelector('#copy-message').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(prepared);
    resultStatus.textContent = 'Consulta copiada. Podés pegarla en un correo.';
  } catch {
    preparedBox.focus();
    preparedBox.select();
    resultStatus.textContent = 'Seleccioné tu consulta para que puedas copiarla manualmente.';
  }
});
document.querySelector('#download-message').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([prepared], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'consulta-web.txt';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
document.querySelector('#year').textContent = new Date().getFullYear();
