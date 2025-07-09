const productos = [
    {
        ciudad: "San Andrés",
        nombre: "Viaje completo 4 días",
        tipo: "viaje",
        imagen: "img/sanandres.jpg",
        imagenes: [
            "img/sanandres.jpg",
            "img/sanandres2.jpg",
            "img/sanandres3.jpg",
        ],
        precio: "1.200.000"
    },
    {
        ciudad: "Cartagena",
        nombre: "Pasadía en Isla Barú",
        tipo: "pasadía",
        imagen: "img/baru.jpg",
        imagenes: [
            "img/baru.jpg",
            "img/baru2.jpg",
            "img/baru3.jpg",
        ],
        precio: "120.000"
    },
    {
        ciudad: "Santa Marta",
        nombre: "Tour a Ciudad Perdida",
        tipo: "tour",
        imagen: "img/santamarta.jpg",
        imagenes: [
            "img/santamarta2.jpg",
            "img/santamarta3.jpg"
        ],
        precio: "800.000"
    }
];

let favoritos = JSON.parse(localStorage.getItem('favoritosJexp')) || [];

function mostrarProductos(lista) {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";
  const moneda = localStorage.getItem('monedaJexp') || 'COP';
  if (lista.length === 0) {
    contenedor.innerHTML = `<div class='no-result'>\n  <p>😕 No se encontraron actividades.<br>¡Contáctanos y te ayudamos a encontrar tu experiencia ideal!</p>\n  <a href='https://wa.me/573237204014?text=Hola, quiero información sobre tours y viajes' class='cta-wsp' target='_blank'>Hablar por WhatsApp</a>\n</div>`;
    return;
  }
  lista.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "producto animar";
    // Calcular precio según moneda
    let precioBase = parseInt(p.precio.replace(/[^0-9]/g, ''));
    let precioFinal = '';
    if (moneda === 'USD') precioFinal = (precioBase / 4000).toLocaleString('en-US') + ' USD';
    else if (moneda === 'EUR') precioFinal = (precioBase / 4400).toLocaleString('de-DE') + ' EUR';
    else precioFinal = precioBase.toLocaleString('es-CO') + ' COP';
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="producto-img" />
      <div class="info">
        <h3 class="producto-nombre">${p.nombre}</h3>
        <p class="producto-ciudad"><strong>${p.ciudad}</strong></p>
        <p class="producto-tipo">${p.tipo.charAt(0).toUpperCase() + p.tipo.slice(1)}</p>
        <p class="precio" data-precio-base="${p.precio}"><strong>${precioFinal}</strong></p>
      </div>
    `;
    card.onclick = () => verDetalles(idx);
    contenedor.appendChild(card);
    setTimeout(() => card.classList.add('visible'), 100);
  });
}

function toggleFavorito(nombre) {
  if (favoritos.includes(nombre)) {
    favoritos = favoritos.filter(f => f !== nombre);
  } else {
    favoritos.push(nombre);
  }
  localStorage.setItem('favoritosJexp', JSON.stringify(favoritos));
  filtrarProductos();
}

function compartirActividad(nombre, ciudad, imagen) {
  const url = window.location.href;
  const text = `¡Mira esta actividad en Jexpedition! ${nombre} en ${ciudad} ${url}`;
  if (navigator.share) {
    navigator.share({ title: nombre, text, url });
  } else {
    prompt('Copia y comparte:', text);
  }
}

function verDetalles(idx) {
  const p = productos[idx];
  const moneda = localStorage.getItem('monedaJexp') || 'COP';
  let precioBase = parseInt(p.precio.replace(/[^0-9]/g, ''));
  let precioFinal = '';
  if (moneda === 'USD') precioFinal = (precioBase / 4000).toLocaleString('en-US') + ' USD';
  else if (moneda === 'EUR') precioFinal = (precioBase / 4400).toLocaleString('de-DE') + ' EUR';
  else precioFinal = precioBase.toLocaleString('es-CO') + ' COP';
  let modal = document.getElementById('modal-detalles');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-detalles';
    modal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:99999;';
    document.body.appendChild(modal);
  }
  // Collage de máximo 3 imágenes: una grande y dos pequeñas
  let imagenes = p.imagenes && Array.isArray(p.imagenes) && p.imagenes.length > 0 ? p.imagenes.slice(0,3) : [p.imagen];
  let collage = '';
  if (imagenes.length > 1) {
    collage = `<div class="modal-collage" style="display:grid;grid-template-columns:2fr 1fr;grid-template-rows:repeat(2,1fr);gap:10px;margin-bottom:18px;height:32vh;min-height:120px;max-width:100vw;">` +
      `<img src="${imagenes[0]}" style="grid-row:1/3;grid-column:1/2;width:100%;height:100%;object-fit:cover;cursor:pointer;border-radius:12px;max-width:100%;max-height:100%;" onclick="verImagenCompleta('${p.nombre}',0)" alt="imagen" />` +
      (imagenes[1] ? `<img src="${imagenes[1]}" style="grid-row:1/2;grid-column:2/3;width:100%;height:100%;object-fit:cover;cursor:pointer;border-radius:12px;max-width:100%;max-height:100%;" onclick="verImagenCompleta('${p.nombre}',1)" alt="imagen" />` : '') +
      (imagenes[2] ? `<img src="${imagenes[2]}" style="grid-row:2/3;grid-column:2/3;width:100%;height:100%;object-fit:cover;cursor:pointer;border-radius:12px;max-width:100%;max-height:100%;" onclick="verImagenCompleta('${p.nombre}',2)" alt="imagen" />` : '') +
      '</div>';
  } else {
    collage = `<img src="${imagenes[0]}" style="width:100%;border-radius:12px;max-height:32vh;object-fit:cover;margin-bottom:18px;cursor:pointer;max-width:100vw;" onclick="verImagenCompleta('${p.nombre}',0)" alt="imagen" />`;
  }
  modal.innerHTML = `
    <div style='background:#fff;padding:2vw 2vw 1vw 2vw;border-radius:0;width:100vw;height:100vh;max-width:100vw;max-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;box-sizing:border-box;overflow-y:auto;'>
      <button onclick="cerrarModal()" style="position:absolute;top:18px;right:18px;font-size:2.2em;background:none;border:none;cursor:pointer;z-index:2;color:#1e90ff;">&times;</button>
      <div style='width:100%;max-width:520px;margin:0 auto;display:flex;flex-direction:column;align-items:center;'>
        ${collage}
        <h2 style='margin-bottom:8px;font-size:2.1em;word-break:break-word;'>${p.nombre}</h2>
        <p style='margin:0 0 8px 0;font-size:1.1em;'><strong>${p.ciudad}</strong> - ${p.tipo.toUpperCase()}</p>
        <p class="precio" style='font-size:1.2em;margin:0 0 12px 0;'><strong>${precioFinal}</strong></p>
        <p style='margin-bottom:18px;font-size:1em;'>Descripción: Una experiencia inolvidable en ${p.ciudad}. ¡Reserva ya!</p>
        <a href="https://wa.me/573237204014?text=Hola, quiero reservar: ${encodeURIComponent(p.nombre)} en ${p.ciudad}" class="cta-wsp" target="_blank" style='display:inline-block;margin-bottom:10px;'>Reservar por WhatsApp</a>
        <button onclick="compartirActividad('${p.nombre}', '${p.ciudad}', '${imagenes[0]}')" style='margin-left:12px;background:#f4f8fb;color:#1e90ff;border:none;border-radius:20px;padding:8px 18px;cursor:pointer;font-weight:bold;'>Compartir</button>
      </div>
    </div>
  `;
  modal.onclick = function(e) { if (e.target === modal) cerrarModal(); };
}

window.verImagenCompleta = function(nombre, idx) {
  const prod = productos.find(p => p.nombre === nombre);
  let imagenes = prod && prod.imagenes && Array.isArray(prod.imagenes) && prod.imagenes.length > 0 ? prod.imagenes.slice(0,3) : [prod.imagen];
  let current = idx;
  let lb = document.getElementById('modal-lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'modal-lightbox';
    lb.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;z-index:100000;';
    document.body.appendChild(lb);
  }
  function render() {
    lb.innerHTML = `
      <button id="lb-prev" style="position:absolute;left:24px;top:50%;transform:translateY(-50%);background:none;border:none;color:#fff;font-size:2.5em;cursor:pointer;z-index:2;">&#8592;</button>
      <img src="${imagenes[current]}" style="max-width:98vw;max-height:98vh;border-radius:12px;box-shadow:0 4px 32px #000;" alt="imagen" />
      <button id="lb-next" style="position:absolute;right:24px;top:50%;transform:translateY(-50%);background:none;border:none;color:#fff;font-size:2.5em;cursor:pointer;z-index:2;">&#8594;</button>
      <button id="lb-close" style="position:absolute;top:18px;right:24px;background:none;border:none;color:#fff;font-size:2.5em;cursor:pointer;z-index:2;">&times;</button>
    `;
    document.getElementById('lb-prev').onclick = function(e){ e.stopPropagation(); current = (current-1+imagenes.length)%imagenes.length; render(); };
    document.getElementById('lb-next').onclick = function(e){ e.stopPropagation(); current = (current+1)%imagenes.length; render(); };
    document.getElementById('lb-close').onclick = function(){ lb.remove(); };
  }
  lb.onclick = function(e) { if (e.target === lb) lb.remove(); };
  render();
}

function cerrarModal() {
  const modal = document.getElementById('modal-detalles');
  if (modal) modal.remove();
}

function filtrarProductos() {
  const texto = document.getElementById("search").value.toLowerCase();
  const tipo = document.getElementById("tipo").value;
  // Elimina el filtro de fecha y el input de fecha si existe
  const inputFecha = document.getElementById("fecha");
  if (inputFecha) inputFecha.style.display = 'none';

  const resultado = productos.filter(p => {
    const coincideTexto = p.nombre.toLowerCase().includes(texto) || p.ciudad.toLowerCase().includes(texto);
    const coincideTipo = tipo === "" || p.tipo === tipo;
    return coincideTexto && coincideTipo;
  });

  mostrarProductos(resultado);
}

// --- FUNCIONES HERO + BUSCADOR UNIFICADO (estructura actual) ---
window.filtrarPorCategoria = function(tipo) {
  document.getElementById("search").value = '';
  mostrarProductos(productos.filter(p => p.tipo === tipo));
};

window.buscarActividades = function() {
  const texto = document.getElementById("search").value.trim().toLowerCase();
  if (!texto) {
    mostrarProductos(productos);
    return;
  }
  const resultado = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    p.ciudad.toLowerCase().includes(texto) ||
    p.tipo.toLowerCase().includes(texto)
  );
  mostrarProductos(resultado);
};

// --- MODAL IDIOMA/MONEDA FUNCIONALIDAD Y REFLEJO EN LA WEB ---
const traducciones = {
  es: {
    titulo: 'Cambiar idioma y moneda',
    idioma: 'Idioma:',
    moneda: 'Moneda:',
    guardar: 'Guardar',
    categorias: ['Viajes', 'Pasadías', 'Tour'],
    buscarPlaceholder: '¿A dónde quieres ir?',
    confianza: '✔️ Compra segura y atención personalizada',
    // ...otros textos...
  },
  en: {
    titulo: 'Change language and currency',
    idioma: 'Language:',
    moneda: 'Currency:',
    guardar: 'Save',
    categorias: ['Trips', 'Day Trips', 'Tour'],
    buscarPlaceholder: 'Where do you want to go?',
    confianza: '✔️ Secure purchase and personalized attention',
    // ...otros textos...
  }
};

function aplicarIdiomaMoneda() {
  const idioma = localStorage.getItem('idiomaJexp') || 'es';
  const moneda = localStorage.getItem('monedaJexp') || 'COP';
  // Cambia textos del modal
  document.getElementById('modal-titulo').textContent = traducciones[idioma].titulo;
  document.querySelector('label[for="idioma-select-modal"]').textContent = traducciones[idioma].idioma;
  document.querySelector('label[for="moneda-select-modal"]').textContent = traducciones[idioma].moneda;
  document.querySelector('.modal-guardar').textContent = traducciones[idioma].guardar;
  // Cambia placeholder del buscador
  document.getElementById('search').placeholder = traducciones[idioma].buscarPlaceholder;
  // Cambia categorías
  const catBtns = document.querySelectorAll('.hero-categorias .cat-btn');
  traducciones[idioma].categorias.forEach((txt, i) => { if(catBtns[i]) catBtns[i].textContent = txt; });
  // Cambia mensaje de confianza
  const conf = document.querySelector('.hero-confianza span');
  if(conf) conf.textContent = traducciones[idioma].confianza;
  // Cambia moneda en productos (si hay productos renderizados)
  document.querySelectorAll('.producto .precio').forEach(el => {
    let precio = el.getAttribute('data-precio-base');
    if (!precio) return;
    let precioBase = parseInt(precio.replace(/[^0-9]/g, ''));
    let precioFinal = '';
    if (moneda === 'USD') precioFinal = (precioBase / 4000).toLocaleString('en-US') + ' USD';
    else if (moneda === 'EUR') precioFinal = (precioBase / 4400).toLocaleString('de-DE') + ' EUR';
    else precioFinal = precioBase.toLocaleString('es-CO') + ' COP';
    el.innerHTML = '<strong>' + precioFinal + '</strong>';
  });
  // Cambia moneda en modal de detalles si está abierto
  const modalPrecio = document.querySelector('#modal-detalles .precio');
  if (modalPrecio && modalPrecio.parentElement) {
    let nombre = modalPrecio.parentElement.querySelector('h2')?.textContent;
    let prod = productos.find(p => p.nombre === nombre);
    if (prod) {
      let precioBase = parseInt(prod.precio.replace(/[^0-9]/g, ''));
      let precioFinal = '';
      if (moneda === 'USD') precioFinal = (precioBase / 4000).toLocaleString('en-US') + ' USD';
      else if (moneda === 'EUR') precioFinal = (precioBase / 4400).toLocaleString('de-DE') + ' EUR';
      else precioFinal = precioBase.toLocaleString('es-CO') + ' COP';
      modalPrecio.innerHTML = '<strong>' + precioFinal + '</strong>';
    }
  }
}

window.abrirModalIdiomaMoneda = function() {
  document.getElementById('modal-idioma-moneda').style.display = 'flex';
  // Set selects actuales
  document.getElementById('idioma-select-modal').value = localStorage.getItem('idiomaJexp') || 'es';
  document.getElementById('moneda-select-modal').value = localStorage.getItem('monedaJexp') || 'COP';
};
window.cerrarModalIdiomaMoneda = function() {
  document.getElementById('modal-idioma-moneda').style.display = 'none';
};
window.guardarIdiomaMoneda = function() {
  const idioma = document.getElementById('idioma-select-modal').value;
  const moneda = document.getElementById('moneda-select-modal').value;
  localStorage.setItem('idiomaJexp', idioma);
  localStorage.setItem('monedaJexp', moneda);
  aplicarIdiomaMoneda();
  cerrarModalIdiomaMoneda();
};
// Aplica idioma/moneda al cargar
window.addEventListener('DOMContentLoaded', aplicarIdiomaMoneda);

// --- HERO Y SECCIONES DINÁMICAS ---
window.addEventListener('DOMContentLoaded', () => {
    const inputFecha = document.getElementById("fecha");
    if (inputFecha) inputFecha.style.display = 'none';

    // Hero dinámico
    if (!document.getElementById('hero-jexp')) {
        const hero = document.createElement('section');
        hero.id = 'hero-jexp';

        // Idiomas disponibles
        const idiomas = [
            { code: 'es', label: 'Español' },
            { code: 'en', label: 'English' }
        ];

        // Categorías dinámicas desde productos
        const categorias = [...new Set(productos.map(p => p.tipo))];

        // Detectar idioma del navegador
    const userLang = (navigator.language || navigator.userLanguage || 'es').slice(0,2);
    const idiomaInicial = idiomas.find(i => i.code === userLang) ? userLang : 'es';

    hero.innerHTML = `
        <div class="hero-content" style="background: linear-gradient(120deg, #007bff 60%, #25d366 100%); border-radius: 18px; box-shadow: 0 4px 24px rgba(30,144,255,0.12); padding: 40px 20px; margin-bottom: 24px; color: #fff;">
            <h1 id="hero-title" style="font-size:2.3em;line-height:1.2;">
                <span style="font-size:1.2em;">🌎</span> <span style="color:#fff;font-weight:bold;letter-spacing:1px;">Jexpedition</span><br>
                <span id="hero-title-main">¡Vive experiencias inolvidables!</span>
            </h1>
            <p id="hero-desc" style="font-size:1.2em;margin:18px 0 24px 0;">Descubre los mejores tours, viajes y pasadías en Colombia.<br>Reserva fácil, rápido y seguro.</p>
            <div style="margin: 16px 0;display:flex;align-items:center;gap:10px;justify-content:center;">
                <label for="idioma-select" style="font-weight:bold;">Idioma:</label>
                <select id="idioma-select" aria-label="Seleccionar idioma" style="padding:6px 12px;border-radius:8px;font-size:1em;">
                    ${idiomas.map(i => `<option value="${i.code}" ${i.code === idiomaInicial ? 'selected' : ''}>${i.label}</option>`).join('')}
                </select>
            </div>
            <div class="categorias-hero" style="margin-bottom:16px;display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">
                ${categorias.map(cat => `
                    <button onclick="filtrarPorCategoria('${cat}')" class="cat-btn" style="background:#fff;color:#1e90ff;font-weight:bold;padding:8px 18px;border-radius:20px;border:none;cursor:pointer;box-shadow:0 2px 8px rgba(30,144,255,0.08);transition:background 0.2s;">${cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
                `).join('')}
            </div>
            <a href="#lista-productos" class="cta-wsp" id="hero-cta" style="font-size:1.2em;padding:16px 36px;">Ver actividades</a>
            <div style="margin-top:24px;font-size:1.1em;font-weight:bold;">
              <span style="background:#fff;color:#25d366;padding:6px 18px;border-radius:20px;box-shadow:0 2px 8px rgba(37,211,102,0.10);">✔️ Compra segura y atención personalizada</span>
            </div>
        </div>
    `;
    document.body.insertBefore(hero, document.body.firstChild.nextSibling);

    // Traducciones globales
    const traducciones = {
      es: {
        title: '¡Vive experiencias inolvidables!',
        desc: 'Descubre los mejores tours, viajes y pasadías en Colombia.<br>Reserva fácil, rápido y seguro.',
        cta: 'Ver actividades',
        categorias: { tour: 'Tours', viaje: 'Viajes', pasadía: 'Pasadías', aventura: 'Aventura' },
        confianza: '✔️ Compra segura y atención personalizada',
        search: '¿A dónde quieres ir?',
        selectAll: 'Todos',
        selectTour: 'Tour',
        selectViaje: 'Viaje',
        selectPasadia: 'Pasadía',
        testimonios: 'Testimonios',
        faq: 'Preguntas frecuentes',
        faq1q: '¿Cómo reservo una actividad?',
        faq1a: 'Haz clic en el botón de WhatsApp en la actividad que te interesa y te atenderemos personalmente.',
        faq2q: '¿Es seguro reservar por aquí?',
        faq2a: 'Sí, contamos con atención personalizada y métodos de pago seguros.',
        faq3q: '¿Puedo cancelar o cambiar mi reserva?',
        faq3a: '¡Por supuesto! Contáctanos y te ayudaremos con el proceso.',
        footer: 'Todos los derechos reservados.',
        contacto: 'Contacto',
        noresult: 'No se encontraron actividades.',
        whatsapp: 'Hablar por WhatsApp'
      },
      en: {
        title: 'Live unforgettable experiences!',
        desc: 'Discover the best tours, trips and day tours in Colombia.<br>Book easily, quickly and safely.',
        cta: 'See activities',
        categorias: { tour: 'Tours', viaje: 'Trips', pasadía: 'Day Trips', aventura: 'Adventure' },
        confianza: '✔️ Secure purchase and personalized attention',
        search: 'Where do you want to go?',
        selectAll: 'All',
        selectTour: 'Tour',
        selectViaje: 'Trip',
        selectPasadia: 'Day Trip',
        testimonios: 'Testimonials',
        faq: 'Frequently Asked Questions',
        faq1q: 'How do I book an activity?',
        faq1a: 'Click the WhatsApp button on the activity you are interested in and we will assist you personally.',
        faq2q: 'Is it safe to book here?',
        faq2a: 'Yes, we offer personalized attention and secure payment methods.',
        faq3q: 'Can I cancel or change my reservation?',
        faq3a: 'Of course! Contact us and we will help you with the process.',
        footer: 'All rights reserved.',
        contacto: 'Contact',
        noresult: 'No activities found.',
        whatsapp: 'Chat on WhatsApp'
      }
    };

    function aplicarTraduccion(idioma) {
      // HERO
      document.getElementById('hero-title-main').textContent = traducciones[idioma].title;
      document.getElementById('hero-desc').innerHTML = traducciones[idioma].desc;
      document.getElementById('hero-cta').textContent = traducciones[idioma].cta;
      document.querySelector('.hero-content > div:last-child span').textContent = traducciones[idioma].confianza;
      // Categorías HERO
      document.querySelectorAll('.categorias-hero .cat-btn').forEach((btn, i) => {
        const cat = categorias[i];
        btn.textContent = traducciones[idioma].categorias[cat] || cat;
      });
      // BUSCADOR
      const search = document.getElementById('search');
      if (search) search.placeholder = traducciones[idioma].search;
      const tipo = document.getElementById('tipo');
      if (tipo) {
        tipo.options[0].text = traducciones[idioma].selectAll;
        tipo.options[1].text = traducciones[idioma].selectTour;
        tipo.options[2].text = traducciones[idioma].selectViaje;
        tipo.options[3].text = traducciones[idioma].selectPasadia;
      }
      // TESTIMONIOS
      const test = document.getElementById('testimonios-jexp');
      if (test) {
        test.querySelector('h2').textContent = traducciones[idioma].testimonios;
        // Puedes traducir testimonios reales aquí si lo deseas
      }
      // FAQ
      const faq = document.getElementById('faq-jexp');
      if (faq) {
        faq.querySelector('h2').textContent = traducciones[idioma].faq;
        const details = faq.querySelectorAll('details');
        if (details.length >= 3) {
          details[0].querySelector('summary').textContent = traducciones[idioma].faq1q;
          details[0].querySelector('p').textContent = traducciones[idioma].faq1a;
          details[1].querySelector('summary').textContent = traducciones[idioma].faq2q;
          details[1].querySelector('p').textContent = traducciones[idioma].faq2a;
          details[2].querySelector('summary').textContent = traducciones[idioma].faq3q;
          details[2].querySelector('p').textContent = traducciones[idioma].faq3a;
        }
      }
      // FOOTER
      const footer = document.getElementById('footer-jexp');
      if (footer) {
        footer.querySelector('p').innerHTML = `© 2025 Jexpedition. ${traducciones[idioma].footer}`;
        const contacto = footer.querySelector('p:last-child a');
        if (contacto) contacto.textContent = traducciones[idioma].contacto + ': info@jexpedition.com';
      }
      // NO RESULT
      const noresult = document.querySelector('.no-result p');
      if (noresult) noresult.textContent = '😕 ' + traducciones[idioma].noresult + '\n¡Contáctanos y te ayudamos a encontrar tu experiencia ideal!';
      const wsp = document.querySelector('.no-result .cta-wsp');
      if (wsp) wsp.textContent = traducciones[idioma].whatsapp;
    }

    // Aplica traducción inicial
    aplicarTraduccion(idiomaInicial);

    // Listener para cambio de idioma
    document.getElementById('idioma-select').addEventListener('change', function() {
      aplicarTraduccion(this.value);
    });
    }

  // Testimonios
  if (!document.getElementById('testimonios-jexp')) {
    const test = document.createElement('section');
    test.id = 'testimonios-jexp';
    test.innerHTML = `
      <h2>Testimonios</h2>
      <div class="testimonios-lista">
        <div class="testimonio"><p>“¡El mejor viaje de mi vida! Todo fue perfecto y la atención excelente.”</p><span>- Laura G.</span></div>
        <div class="testimonio"><p>“Reservar fue súper fácil y el tour superó mis expectativas.”</p><span>- Andrés P.</span></div>
        <div class="testimonio"><p>“Repetiría sin dudarlo. Muy recomendado.”</p><span>- Camila R.</span></div>
      </div>
    `;
    document.body.appendChild(test);
  }

  // FAQ
  if (!document.getElementById('faq-jexp')) {
    const faq = document.createElement('section');
    faq.id = 'faq-jexp';
    faq.innerHTML = `
      <h2>Preguntas frecuentes</h2>
      <details><summary>¿Cómo reservo una actividad?</summary><p>Haz clic en el botón de WhatsApp en la actividad que te interesa y te atenderemos personalmente.</p></details>
      <details><summary>¿Es seguro reservar por aquí?</summary><p>Sí, contamos con atención personalizada y métodos de pago seguros.</p></details>
      <details><summary>¿Puedo cancelar o cambiar mi reserva?</summary><p>¡Por supuesto! Contáctanos y te ayudaremos con el proceso.</p></details>
    `;
    document.body.appendChild(faq);
  }

  // Footer mejorado
  const footer = document.querySelector('footer');
  if (footer && !document.getElementById('footer-jexp')) {
    footer.innerHTML = `
      <div id="footer-jexp">
        <p>© 2025 Jexpedition. Todos los derechos reservados.</p>
        <div class="redes">
          <a href="https://wa.me/573237204014" target="_blank" aria-label="WhatsApp">WhatsApp</a>
          <a href="#" target="_blank" aria-label="Instagram">Instagram</a>
          <a href="#" target="_blank" aria-label="Facebook">Facebook</a>
        </div>
        <p>Contacto: <a href="mailto:info@jexpedition.com">info@jexpedition.com</a></p>
      </div>
    `;
  }

  // Mensaje de confianza fijo
  if (!document.getElementById('confianza-msg')) {
    const confianza = document.createElement('div');
    confianza.id = 'confianza-msg';
    confianza.innerHTML = '✔️ Compra segura y atención personalizada';
    document.body.appendChild(confianza);
  }

  mostrarProductos(productos);
});
