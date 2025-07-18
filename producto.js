// ✅ 1. Normaliza texto para encontrar el producto
function normalizarTexto(texto) {
  return texto.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\\s]/gi, "");
}

// ✅ 2. Obtiene parámetros de la URL
function getParametro(nombre) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(nombre);
}

// ✅ 3. Ya no usa API. Solo usa localStorage
function actualizarTasasDeCambio() {
  // Función vacía porque ya no se usa API externa
  console.log('Las tasas de cambio ya deben estar guardadas en localStorage.');
}

// ✅ 4. Obtiene tasas desde localStorage
function obtenerTasas() {
  const guardadas = localStorage.getItem('tasasCambio');
  return guardadas ? JSON.parse(guardadas) : { COP: 1 };
}

function actualizarPrecioProducto() {
  const precioSpan = document.getElementById("precio-convertido");
  if (!precioSpan) return;

  const moneda = localStorage.getItem('monedaSeleccionada') || 'COP';
  const precioGuardado = localStorage.getItem('precioConvertidoVista');
  if (!precioGuardado) {
    precioSpan.textContent = 'Precio no disponible';
    return;
  }

  const simbolos = {
    COP: "$",
    USD: "US$",
    EUR: "€",
    MXN: "MX$",
    ARS: "AR$",
    BRL: "R$",
    GBP: "£",
    CLP: "CLP$",
    PEN: "S/"
  };

  const valorNumerico = parseFloat(precioGuardado);
  const precioFormateado = moneda === 'COP'
    ? `${simbolos[moneda]} ${Math.round(valorNumerico).toLocaleString('es-CO')}`
    : `${simbolos[moneda]} ${valorNumerico.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  precioSpan.textContent = precioFormateado;
}

// ✅ 7. Si cambia la moneda, actualiza el precio
window.addEventListener('storage', (e) => {
  if (e.key === 'monedaSeleccionada') {
    actualizarPrecioProducto();
  }
});


/// ✅ 8. DOMContentLoaded
window.addEventListener('DOMContentLoaded', async () => {
  const nombre = decodeURIComponent(getParametro('nombre') || '').trim();
  const prod = productos.find(p => normalizarTexto(p.nombre) === normalizarTexto(nombre));

  if (!prod) {
    document.getElementById('vista-producto').innerHTML = `<p>Producto no encontrado.</p>`;
    return;
  }

  await actualizarTasasDeCambio(); // tasas listas antes de mostrar precio

const moneda = localStorage.getItem('monedaSeleccionada') || 'COP';
localStorage.setItem('monedaUsadaVista', moneda); // por compatibilidad si aún la usas

  const imagenes = prod.imagenes?.length ? prod.imagenes : [prod.imagen];
  const collageHTML = `
    <div class="contenedor-collage">
      <div class="collage-producto">
        <div class="img-grande">
          <img src="${imagenes[0]}" onclick="verImagenCompleta('${prod.nombre}', 0)" />
        </div>
        <div class="img-pequenas">
          ${imagenes[1] ? `<img src="${imagenes[1]}" onclick="verImagenCompleta('${prod.nombre}', 1)" />` : ''}
          ${imagenes[2] ? `<img src="${imagenes[2]}" onclick="verImagenCompleta('${prod.nombre}', 2)" />` : ''}
        </div>
      </div>
      <button class="mostrar-galeria-encima" onclick="mostrarGaleriaExpandida()">Mostrar más imágenes</button>
    </div>

    <div id="galeria-expandida" class="galeria-expandida">
      ${imagenes.map((img, i) => `<img src="${img}" onclick="verImagenCompleta('${prod.nombre}', ${i})" />`).join('')}
    </div>

    <div class="barra-flotante-wsp">
      <div class="precio-container">
        <span class="label">Precio:</span>
        <span class="valor" id="precio-convertido">Cargando...</span>
      </div>
      <a id="btn-wsp" class="cta-wsp">Reservar</a>
    </div>
  `;

  document.getElementById('vista-producto').innerHTML = `
    <div>
      ${collageHTML}
      <h1>${prod.nombre}</h1>
      <p><strong>${prod.ciudad}</strong> - ${prod.tipo.toUpperCase()}</p>
      <p>${prod.descripcion}</p>
      <div class="fila-contadores-calendario">
        <div class="grupo-contadores">${crearContadoresHTML()}</div>
        <div class="contenedor-calendario">
          <label><strong>Selecciona fecha de reserva:</strong></label>
          <div id="calendario-reserva"></div>
        </div>
      </div>
      <div id="form-nombres"></div>
      <span id="msg-copiado">¡Enlace copiado!</span>
    </div>
  `;

  // ✅ Una vez que el HTML ya está en el DOM, actualizamos el precio
  actualizarPrecioProducto();

  flatpickr("#calendario-reserva", {
    inline: true,
    locale: "es",
    dateFormat: "d-m-Y",
    minDate: "today",
    onChange: function (_, dateStr) {
      let hiddenInput = document.getElementById("fecha-reserva");
      if (!hiddenInput) {
        hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.id = "fecha-reserva";
        document.body.appendChild(hiddenInput);
      }
      hiddenInput.value = dateStr;
      actualizarLinkWhatsApp(prod);
    }
  });

  actualizarLinkWhatsApp(prod); // también actualiza el enlace con moneda actual
});







function mostrarGaleriaExpandida() {
  const galeria = document.getElementById('galeria-expandida');
  if (galeria) galeria.style.display = 'flex';
  const boton = document.querySelector('.mostrar-galeria-encima');
  if (boton) boton.style.display = 'none';
}

function crearContadoresHTML() {
  return `
    <div class="grupo-contadores">
      <h3>Selecciona tu grupo:</h3>
      ${crearContador('adultos', 'Adultos', 'Mayores de 13 años')}
      ${crearContador('ninos', 'Niños', 'De 2 a 12 años')}
      ${crearContador('bebes', 'Bebés', 'Menores de 2 años')}
      ${crearContador('mascotas', 'Mascotas', '')}
    </div>
  `;
}

function crearContador(id, label, subtitulo = '') {
  return `
    <div class="contador-item">
      <div class="info-contador">
        <span class="label">${label}</span>
        ${subtitulo ? `<small class="subtitulo">${subtitulo}</small>` : ''}
      </div>
      <div class="acciones-contador">
        <button onclick="cambiarCantidad('${id}', -1)" class="decrement">−</button>
        <span id="count-${id}" class="count">0</span>
        <button onclick="cambiarCantidad('${id}', 1)" class="increment">+</button>
      </div>
    </div>
  `;
}

function cambiarCantidad(id, cambio) {
  const span = document.getElementById(`count-${id}`);
  let valor = parseInt(span.textContent);
  valor = Math.max(0, valor + cambio);
  span.textContent = valor;
  actualizarCamposDeNombres();
  actualizarLinkWhatsApp();
}

function actualizarCamposDeNombres() {
  const tipos = [
    { id: 'adultos', label: 'Adulto' },
    { id: 'ninos', label: 'Niño' },
    { id: 'bebes', label: 'Bebé' },
    { id: 'mascotas', label: 'Mascota' }
  ];
  const contenedor = document.getElementById('form-nombres');
  contenedor.innerHTML = '';
  tipos.forEach(({ id, label }) => {
    const cantidad = parseInt(document.getElementById(`count-${id}`).textContent);
    for (let i = 1; i <= cantidad; i++) {
      contenedor.innerHTML += `
        <div>
          <label for="${id}-${i}">${label} ${i}:</label>
          <input type="text" id="${id}-${i}" placeholder="Nombre de ${label.toLowerCase()} ${i}" />
        </div>
      `;
    }
  });
}

function actualizarLinkWhatsApp(producto) {
  const nombre = producto ? producto.nombre : document.title;
  const ciudad = producto ? producto.ciudad : '';
  const adultos = document.getElementById('count-adultos')?.textContent || '0';
  const ninos = document.getElementById('count-ninos')?.textContent || '0';
  const bebes = document.getElementById('count-bebes')?.textContent || '0';
  const mascotas = document.getElementById('count-mascotas')?.textContent || '0';
  const fecha = document.getElementById('fecha-reserva')?.value || '';
  let mensaje = `Hola, quiero reservar: ${nombre} en ${ciudad}`;
  if (fecha) mensaje += `\nFecha: ${fecha}`;
  mensaje += `\nAdultos: ${adultos}, Niños: ${ninos}, Bebés: ${bebes}, Mascotas: ${mascotas}`;
  const url = `https://wa.me/573237204014?text=${encodeURIComponent(mensaje)}`;
  document.getElementById('btn-wsp').href = url;
}

function compartirProducto() {
  const url = window.location.href;
  const msg = document.getElementById('msg-copiado');
  if (navigator.share) {
    navigator.share({ title: document.title, url: url }).catch(() => {});
  } else {
    navigator.clipboard.writeText(url).then(() => {
      msg.style.display = 'inline';
      setTimeout(() => msg.style.display = 'none', 3000);
    });
  }
}

window.verImagenCompleta = function(nombre, idx) {
  const imagenes = window.imagenesDelProducto || [];
  if (!imagenes.length) return;
  let current = idx;
  const existente = document.getElementById('modal-lightbox');
  if (existente) existente.remove();
  const lb = document.createElement('div');
  lb.id = 'modal-lightbox';
  lb.className = 'modal-lightbox';

  function render() {
    lb.innerHTML = `
      <button id="lb-prev">←</button>
      <img src="${imagenes[current]}" alt="imagen" />
      <button id="lb-next">→</button>
      <button id="lb-close">×</button>
    `;
    document.getElementById('lb-prev').onclick = (e) => { e.stopPropagation(); current = (current - 1 + imagenes.length) % imagenes.length; render(); };
    document.getElementById('lb-next').onclick = (e) => { e.stopPropagation(); current = (current + 1) % imagenes.length; render(); };
    document.getElementById('lb-close').onclick = () => lb.remove();
  }

  lb.onclick = (e) => { if (e.target === lb) lb.remove(); };
  document.body.appendChild(lb);
  render();
};
