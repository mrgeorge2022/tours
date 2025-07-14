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
      "img/sanandres3.jpg",
    ],
    precioCOP: 100000,
    descripcion: "Disfruta de 4 días inolvidables en las playas paradisíacas de San Andrés. Todo incluido: vuelos, hotel, alimentación y tours."
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
    precioCOP: 100000,
    descripcion: "Escápate por un día a las aguas cristalinas de Isla Barú. Transporte, almuerzo y actividades acuáticas incluidas."
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
    precioCOP: 800000,
    descripcion: "Aventura de varios días en la Sierra Nevada hasta Ciudad Perdida, una experiencia mágica llena de historia y naturaleza."
  },
  {
    ciudad: "Medellín",
    nombre: "Explorando Medellín en 2 días",
    tipo: "tour",
    imagen: "img/sanandres.jpg",
    imagenes: [
      "img/sanandres.jpg",
      "img/sanandres2.jpg",
      "img/sanandres3.jpg"
    ],
    precioCOP: 950000,
    descripcion: "Recorre Medellín como nunca antes: Graffitour, metrocable, parques, museos y lo mejor de la gastronomía paisa."
  },
  {
    ciudad: "Bogotá",
    nombre: "Aventura en la Candelaria",
    tipo: "pasadía",
    imagen: "img/baru.jpg",
    imagenes: [
      "img/baru.jpg",
      "img/baru2.jpg",
      "img/baru3.jpg"
    ],
    precioCOP: 1200000,
    descripcion: "Explora el centro histórico de Bogotá con guías locales. Arte, historia, gastronomía y mucha cultura en un solo día."
  },
  {
    ciudad: "Cartagena",
    nombre: "Tour por la Ciudad Amurallada",
    tipo: "tour",
    imagen: "img/santamarta.jpg",
    imagenes: [
      "img/santamarta2.jpg",
      "img/santamarta3.jpg"
    ],
    precioCOP: 450000,
    descripcion: "Déjate llevar por la magia de las calles coloniales de Cartagena. Tour guiado con transporte y degustaciones incluidas."
  },
  {
    ciudad: "Santa Marta",
    nombre: "Tayrona - Naturaleza en su máxima expresión",
    tipo: "viaje",
    imagen: "img/sanandres.jpg",
    imagenes: [
      "img/sanandres.jpg",
      "img/sanandres2.jpg",
      "img/sanandres3.jpg"
    ],
    precioCOP: 600000,
    descripcion: "Descubre las mejores playas del Parque Tayrona, camina por senderos naturales y vive la selva caribeña."
  },
  {
    ciudad: "San Andrés",
    nombre: "Snorkeling en el Paraíso",
    tipo: "viaje",
    imagen: "img/santamarta.jpg",
    imagenes: [
      "img/santamarta2.jpg",
      "img/santamarta3.jpg"
    ],
    precioCOP: 300000,
    descripcion: "Sumérgete en los arrecifes de San Andrés con nuestro tour de snorkeling. Equipo, guía y traslados incluidos."
  },
  {
    ciudad: "Medellín",
    nombre: "Tour cultural en Comuna 13",
    tipo: "pasadía",
    imagen: "img/baru.jpg",
    imagenes: [
      "img/baru.jpg",
      "img/baru2.jpg",
      "img/baru3.jpg"
    ],
    precioCOP: 200000,
    descripcion: "Conoce la historia de transformación de la Comuna 13 con guías locales, música urbana, arte callejero y comida típica."
  },
  {
    ciudad: "Cali",
    nombre: "Salsa y Cultura en Cali",
    tipo: "tour",
    imagen: "img/sanandres.jpg",
    imagenes: [
      "img/sanandres.jpg",
      "img/sanandres2.jpg",
      "img/sanandres3.jpg"
    ],
    precio: "350.000",
    descripcion: "Vive la energía de Cali con clases de salsa, visitas a sitios emblemáticos y una noche de rumba inolvidable."
  }
];




function abrirModalIdiomaMoneda() {
  const modal = document.getElementById('modal-moneda');
  if (modal) modal.classList.remove('oculto');
}

function cerrarModalIdiomaMoneda() {
  const modal = document.getElementById('modal-moneda');
  if (modal) modal.classList.add('oculto');
}


function cargarTasaMoneda() {
  if (monedaSeleccionada === 'COP') {
    tasaConversion = 1;
    actualizarPrecios();
    return;
  }

  fetch('https://open.er-api.com/v6/latest/COP')
    .then(res => res.json())
    .then(data => {
      const rates = data.rates;
      tasaConversion = rates[monedaSeleccionada] || 1;
      actualizarPrecios();
    })
    .catch(err => {
      console.error('Error al cargar tasas:', err);
      tasaConversion = 1;
      actualizarPrecios();
    });
}

function formatearMoneda(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: monedaSeleccionada
  }).format(valor);
}

function actualizarPrecios() {
  document.querySelectorAll('[data-precio-base]').forEach(el => {
    const base = parseFloat(el.dataset.precioBase);
    const convertido = base * tasaConversion;
    el.innerHTML = `<strong>${formatearMoneda(convertido)}</strong>`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('selector-moneda');
  if (selector) {
    selector.value = monedaSeleccionada;
    selector.addEventListener('change', e => {
      monedaSeleccionada = e.target.value;
      localStorage.setItem('moneda', monedaSeleccionada);
      cargarTasaMoneda();
    });
  }

  cargarTasaMoneda(); // carga inicial
});


function aplicarGoogleTranslate(idioma) {
  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = idioma;
    combo.dispatchEvent(new Event('change'));
  }
}


function guardarPreferencias() {
  const selectorMoneda = document.getElementById('selector-moneda');
  const selectorIdioma = document.getElementById('selector-idioma');

  const moneda = selectorMoneda.value;
  const idioma = selectorIdioma.value;

  localStorage.setItem('moneda', moneda);
  localStorage.setItem('idiomaSeleccionado', idioma);

  cerrarModalIdiomaMoneda();
  cargarTasaMoneda(); // actualiza precios según la moneda

  aplicarGoogleTranslate(idioma); // aplica la traducción automática
}

localStorage.setItem('productosJexp', JSON.stringify(productos));

let favoritos = JSON.parse(localStorage.getItem('favoritosJexp')) || [];

function normalizarTexto(texto) {
  return texto.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/[^a-z0-9\s]/gi, ""); // elimina caracteres especiales
}

function mostrarProductos(lista) {
  const contenedor = document.getElementById("lista-productos");
  const noResult = document.getElementById("no-result");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    if (noResult) noResult.style.display = "block";
    return;
  } else {
    if (noResult) noResult.style.display = "none";
  }
  lista.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "producto animar";
    // Normalizar nombre y ciudad para los data-attributes
    card.setAttribute('data-nombre', normalizarTexto(p.nombre));
    card.setAttribute('data-destino', normalizarTexto(p.ciudad));
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="producto-img" />
      <div class="info">
        <h3 class="producto-nombre">${p.nombre}</h3>
        <p class="producto-ciudad"><strong>${p.ciudad}</strong></p>
        <p class="producto-tipo">${p.tipo.charAt(0).toUpperCase() + p.tipo.slice(1)}</p>
        <p class="precio" data-precio-base="${p.precioCOP}"><strong>${p.precioCOP}</strong></p>
      </div>
    `;
    card.onclick = () => {
      const nombreURL = encodeURIComponent(productos[idx].nombre);
      window.open(`producto.html?nombre=${nombreURL}`, '_blank');
    };
  contenedor.appendChild(card);
  setTimeout(() => card.classList.add('visible'), 100);
});

actualizarPrecios(); // 👈 esto es clave
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
  // Vista nueva reemplazando el contenido del body
  document.body.innerHTML = `
    <div class="vista-producto" style="padding: 24px; max-width: 960px; margin: auto; font-family: 'Segoe UI', sans-serif;">
      <button onclick="location.reload()" style="background:none;border:none;color:#1e90ff;font-size:1.1em;cursor:pointer;margin-bottom:20px;">← Volver</button>
      
      <h1 style="margin-bottom:8px;">${p.nombre}</h1>
      <p style="font-size:1.1em;margin:0 0 18px 0;"><strong>${p.ciudad}</strong> - ${p.tipo.toUpperCase()}</p>

      <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px;">
        ${p.imagenes.map((img, i) => `
          <img src="${img}" onclick="verImagenCompleta('${p.nombre.replace(/'/g, "\\'")}', ${i})" alt="${p.nombre}" style="flex: 1 1 280px; max-width: 100%; border-radius: 12px; object-fit: cover; cursor: pointer;" />
        `).join('')}
      </div>

<p style="font-size:1.2em;" class="precio" data-precio-base="${p.precioCOP}">
  <strong>Precio:</strong> ${p.precioCOP}
</p>

      <p style="margin:16px 0;">Una experiencia inolvidable en <strong>${p.ciudad}</strong>. ¡Reserva ya y disfruta cada momento!</p>

      <a href="https://wa.me/573237204014?text=Hola, quiero reservar: ${encodeURIComponent(p.nombre)} en ${p.ciudad}" 
         class="cta-wsp" 
         style="display:inline-block;margin-top:10px;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:30px;background:#25d366;color:#fff;box-shadow:0 2px 8px rgba(37,211,102,0.2);">
         Reservar por WhatsApp
      </a>
    </div>
  `;
  actualizarPrecios();
}

window.verImagenCompleta = function(nombre, idx) {
  const prod = productos.find(p => p.nombre === nombre);
  const imagenes = prod?.imagenes?.length ? prod.imagenes : [prod.imagen];
  let current = idx;

  const existente = document.getElementById('modal-lightbox');
  if (existente) existente.remove();

  const lb = document.createElement('div');
  lb.id = 'modal-lightbox';
  lb.style = `
    position:fixed;
    top:0; left:0; width:100vw; height:100vh;
    background:rgba(0,0,0,0.95);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:100000;
    flex-direction:column;
  `;

  function render() {
    lb.innerHTML = `
      <button id="lb-prev" ...>←</button>
      <img src="${imagenes[current]}" style="..." />
      <button id="lb-next" ...>→</button>
      <button id="lb-close" ...>×</button>
    `;
  }

  function cerrar() {
    document.removeEventListener('keydown', keyHandler);
    lb.remove();
  }

  function keyHandler(e) {
    if (e.key === 'ArrowLeft') { current = (current - 1 + imagenes.length) % imagenes.length; render(); }
    if (e.key === 'ArrowRight') { current = (current + 1) % imagenes.length; render(); }
    if (e.key === 'Escape') cerrar();
  }

  document.addEventListener('keydown', keyHandler);
  lb.onclick = e => { if (e.target === lb) cerrar(); };

  document.body.appendChild(lb);
  render();
};

window.buscarActividades = function() {
  const texto = normalizarTexto(document.getElementById("search").value.trim());
  if (!texto) {
    mostrarProductos(productos);
    return;
  }
  const resultado = productos.filter(p =>
    normalizarTexto(p.nombre).includes(texto) ||
    normalizarTexto(p.ciudad).includes(texto) ||
    normalizarTexto(p.tipo).includes(texto)
  );
  mostrarProductos(resultado);
};

window.filtrarPorCategoria = function(tipo) {
  document.getElementById("search").value = '';
  mostrarProductos(productos.filter(p => p.tipo === tipo));
};

window.addEventListener('DOMContentLoaded', () => {
  const inputFecha = document.getElementById("fecha");
  if (inputFecha) inputFecha.style.display = 'none';

  if (!document.getElementById('hero-jexp')) {
    const hero = document.createElement('section');
    hero.id = 'hero-jexp';
  }
  mostrarProductos(productos);
});

(function() {
  // Función de distancia de Levenshtein para similitud ortográfica
  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    let matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + (a[j - 1] === b[i - 1] ? 0 : 1),
                               Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
    return matrix[b.length][a.length];
  }
})();


  // Resalta coincidencias en cualquier parte del texto
  function resaltarCoincidencias(texto, input) {
    let normTexto = normalizarTexto(texto);
    let normInput = normalizarTexto(input);
    if (!normInput) return texto;
    let palabras = normInput.split(' ').filter(Boolean);
    let out = '';
    let i = 0;
    while (i < texto.length) {
      let match = false;
      for (let w of palabras) {
        if (w.length > 0 && normTexto.slice(i, i + w.length) === w) {
          out += `<span style='background:#d0f0ff;color:#1e90ff;font-weight:bold;'>${texto.slice(i, i + w.length)}</span>`;
          i += w.length;
          match = true;
          break;
        }
      }
      if (!match) {
        out += texto[i];
        i++;
      }
    }
    return out;
  }

let sugerenciasDiv;

function crearSugerenciasDiv() {
  sugerenciasDiv = document.getElementById('sugerencias-buscador');
  if (!sugerenciasDiv) {
    sugerenciasDiv = document.createElement('div');
    sugerenciasDiv.id = 'sugerencias-buscador';
    sugerenciasDiv.className = 'sugerencias-buscador';
    document.body.appendChild(sugerenciasDiv);
  }
}

function posicionarSugerencias() {
  const input = document.getElementById('search');
  if (!input || !sugerenciasDiv) return;
  const rect = input.getBoundingClientRect();
  sugerenciasDiv.style.left = rect.left + window.scrollX + 'px';
  sugerenciasDiv.style.top = (rect.bottom + window.scrollY + 2) + 'px';
  sugerenciasDiv.style.width = rect.width + 'px';
}

function mostrarSugerencias(texto) {
  crearSugerenciasDiv();
  posicionarSugerencias();
  texto = normalizarTexto(texto.trim());

  let sugeridos = [];
  let exactos = [], inicios = [], contiene = [], similares = [];

  if (texto.length < 1) {
    sugeridos = productos.slice(0, 6).map((p, idx) => ({ p, idx, score: 1, tipo: 'inicio' }));
  } else {
    let palabras = texto.split(' ').filter(Boolean);

    exactos = productos.map((p, idx) => {
      const nombreNorm = normalizarTexto(p.nombre);
      const ciudadNorm = normalizarTexto(p.ciudad);
      const tipoNorm = normalizarTexto(p.tipo);
      let campos = [nombreNorm, ciudadNorm, tipoNorm];
      let todas = palabras.every(w => campos.some(c => c.includes(w)));
      let score = 0;
      if (todas && nombreNorm === texto) score = 1000;
      else if (todas && ciudadNorm === texto) score = 900;
      else if (todas && tipoNorm === texto) score = 800;
      return score > 0 ? { p, idx, score, tipo: 'exacto' } : null;
    }).filter(Boolean);

    inicios = productos.map((p, idx) => {
      const nombreNorm = normalizarTexto(p.nombre);
      const ciudadNorm = normalizarTexto(p.ciudad);
      const tipoNorm = normalizarTexto(p.tipo);
      let campos = [nombreNorm, ciudadNorm, tipoNorm];
      let todas = palabras.every(w => campos.some(c => c.includes(w)));
      let score = 0;
      if (todas && nombreNorm.startsWith(texto)) score = 700;
      else if (todas && ciudadNorm.startsWith(texto)) score = 600;
      else if (todas && tipoNorm.startsWith(texto)) score = 500;
      return score > 0 ? { p, idx, score, tipo: 'inicio' } : null;
    }).filter(Boolean);

    contiene = productos.map((p, idx) => {
      const nombreNorm = normalizarTexto(p.nombre);
      const ciudadNorm = normalizarTexto(p.ciudad);
      const tipoNorm = normalizarTexto(p.tipo);
      let campos = [nombreNorm, ciudadNorm, tipoNorm];
      let todas = palabras.every(w => campos.some(c => c.includes(w)));
      let score = 0;
      if (todas) {
        palabras.forEach(w => {
          if (nombreNorm.includes(w)) score += 120;
          if (ciudadNorm.includes(w)) score += 80;
          if (tipoNorm.includes(w)) score += 40;
        });
      }
      return (score > 0 && todas) ? { p, idx, score, tipo: 'contiene' } : null;
    }).filter(Boolean);

    let todos = [...exactos, ...inicios, ...contiene];

    if (todos.length < 4) {
      let contieneAlguna = productos.map((p, idx) => {
        const nombreNorm = normalizarTexto(p.nombre);
        const ciudadNorm = normalizarTexto(p.ciudad);
        const tipoNorm = normalizarTexto(p.tipo);
        let score = 0;
        palabras.forEach(w => {
          if (nombreNorm.includes(w)) score += 60;
          if (ciudadNorm.includes(w)) score += 40;
          if (tipoNorm.includes(w)) score += 20;
        });
        return score > 0 ? { p, idx, score, tipo: 'alguna' } : null;
      }).filter(Boolean);
      todos = [...todos, ...contieneAlguna];
    }

    let vistos = new Set();
    sugeridos = todos.filter(obj => {
      const key = obj.p.nombre + '|' + obj.p.ciudad + '|' + obj.p.tipo;
      if (vistos.has(key)) return false;
      vistos.add(key);
      return true;
    }).sort((a, b) => b.score - a.score);

    if (sugeridos.length === 0) {
      let maxDist = texto.length <= 5 ? 1 : (texto.length <= 8 ? 2 : 3);
      similares = productos.map((p, idx) => {
        const nombreNorm = normalizarTexto(p.nombre);
        const ciudadNorm = normalizarTexto(p.ciudad);
        const tipoNorm = normalizarTexto(p.tipo);
        let minDist = Math.min(
          levenshtein(nombreNorm, texto),
          levenshtein(ciudadNorm, texto),
          levenshtein(tipoNorm, texto)
        );
        return minDist <= maxDist ? { p, idx, score: 100 - minDist * 20, minDist, tipo: 'similar' } : null;
      }).filter(Boolean).sort((a, b) => a.minDist - b.minDist || b.score - a.score);
    }
  }

  let html = '';

  const renderItems = (titulo, arr) => {
    html += `<div class="titulo-seccion">${titulo}</div>`;
    html += arr.slice(0, 4).map(obj => {
      const p = obj.p;
      return `<div class="sugerencia-item" tabindex="0" data-idx="${obj.idx}">
        <img src="${p.imagen}" alt="miniatura">
        <div>
          <div class="nombre">${resaltarCoincidencias(p.nombre, texto)}</div>
          <div class="descripcion">${p.tipo.charAt(0).toUpperCase() + p.tipo.slice(1)} · <span>${resaltarCoincidencias(p.ciudad, texto)}</span></div>
        </div>
      </div>`;
    }).join('');
  };

  if (exactos.length) renderItems('Coincidencias exactas', exactos);
  if (inicios.length) renderItems('Coincidencias por inicio', inicios);
  if (contiene.length) renderItems('Coincidencias parciales', contiene);

  if (sugeridos.length === 0 && similares.length > 0) {
    html += `<div class="titulo-seccion">¿Quisiste decir:</div>`;
    html += similares.slice(0, 6).map(obj => {
      const p = obj.p;
      let campoMostrado = p.nombre;
      if (levenshtein(normalizarTexto(p.nombre), texto) === obj.minDist) campoMostrado = resaltarCorreccion(p.nombre, texto);
      else if (levenshtein(normalizarTexto(p.ciudad), texto) === obj.minDist) campoMostrado = resaltarCorreccion(p.ciudad, texto) + ' (' + p.nombre + ')';
      else if (levenshtein(normalizarTexto(p.tipo), texto) === obj.minDist) campoMostrado = resaltarCorreccion(p.tipo, texto) + ' (' + p.nombre + ')';
      return `<div class="sugerencia-item" tabindex="0" data-idx="${productos.indexOf(p)}">
        <img src="${p.imagen}" alt="miniatura">
        <div>
          <div class="nombre">${campoMostrado}</div>
          <div class="descripcion">${p.tipo.charAt(0).toUpperCase() + p.tipo.slice(1)} · <span>${p.ciudad}</span></div>
        </div>
      </div>`;
    }).join('');
  }

  if (!html) {
    sugerenciasDiv.innerHTML = '';
    sugerenciasDiv.style.display = 'none';
    return;
  }

  sugerenciasDiv.innerHTML = html;
  sugerenciasDiv.style.display = 'block';

  // Ahora, en lugar de abrir un producto, filtramos directamente los productos
  Array.from(sugerenciasDiv.querySelectorAll('.sugerencia-item')).forEach(item => {
    item.onclick = function () {
      const idx = parseInt(this.getAttribute('data-idx'));
      sugerenciasDiv.style.display = 'none';
      // Filtrar los productos según el nombre de la sugerencia
      const productoFiltrado = productos.filter(p => normalizarTexto(p.nombre).includes(normalizarTexto(item.querySelector('.nombre').innerText)));
      mostrarProductos(productoFiltrado);
    };
  });

  let items = Array.from(sugerenciasDiv.querySelectorAll('.sugerencia-item'));
  let input = document.getElementById('search');
  let idxSel = -1;

  input.onkeydown = function (e) {
    if (!['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) return;

    if (e.key === 'ArrowDown') {
      idxSel = Math.min(idxSel + 1, items.length - 1);
    } else if (e.key === 'ArrowUp') {
      idxSel = Math.max(idxSel - 1, 0);
    } else if (e.key === 'Enter') {
      items[idxSel].click();
    } else if (e.key === 'Escape') {
      sugerenciasDiv.style.display = 'none';
      return;
    }

    items.forEach((item, idx) => {
      item.classList.toggle('seleccionado', idx === idxSel);
    });
  };
}


document.addEventListener('click', function (e) {
  if (!sugerenciasDiv) return;
  if (!sugerenciasDiv.contains(e.target) && e.target.id !== 'search') {
    sugerenciasDiv.style.display = 'none';
  }
});

window.addEventListener('DOMContentLoaded', function () {
  crearSugerenciasDiv();
  const input = document.getElementById('search');
  if (!input) return;
  input.setAttribute('autocomplete', 'off');
  input.addEventListener('input', function () {
    mostrarSugerencias(this.value);
  });
  input.addEventListener('focus', function () {
    mostrarSugerencias(this.value);
  });
  window.addEventListener('resize', posicionarSugerencias);
  window.addEventListener('scroll', posicionarSugerencias, true);
});


let tasaConversion = 1;
let monedaSeleccionada = localStorage.getItem('moneda') || 'COP';


