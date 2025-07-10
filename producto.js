const productos = JSON.parse(localStorage.getItem('productosJexp')) || [];

function normalizarTexto(texto) {
  return texto.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/gi, "");
}

function getParametro(nombre) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(nombre);
}

window.addEventListener('DOMContentLoaded', () => {
  const nombre = decodeURIComponent(getParametro('nombre') || '').trim();
  const prod = productos.find(p => normalizarTexto(p.nombre) === normalizarTexto(nombre));

  if (!prod) {
    document.getElementById('vista-producto').innerHTML = `<p>Producto no encontrado.</p>`;
    return;
  }

  document.title = prod.nombre;

  const imagenes = prod.imagenes && prod.imagenes.length ? prod.imagenes : [prod.imagen];
  window.imagenesDelProducto = imagenes;

  let collageHTML = '';
  if (imagenes.length > 1) {
    collageHTML = `
      <div class="collage-producto" style="display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: repeat(2, 1fr); gap: 10px; margin-bottom: 18px;">
        <img src="${imagenes[0]}" style="grid-row: 1 / 3; width: 100%; height: 100%; object-fit: cover; border-radius: 12px; cursor: pointer;" onclick="verImagenCompleta('${prod.nombre.replace(/'/g, "\\'")}', 0)" />
        ${imagenes[1] ? `<img src="${imagenes[1]}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px; cursor: pointer;" onclick="verImagenCompleta('${prod.nombre.replace(/'/g, "\\'")}', 1)" />` : ''}
        ${imagenes[2] ? `<img src="${imagenes[2]}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px; cursor: pointer;" onclick="verImagenCompleta('${prod.nombre.replace(/'/g, "\\'")}', 2)" />` : ''}
      </div>
      <button onclick="document.getElementById('galeria-expandida').style.display='flex'; this.style.display='none';" style="background:#f4f8fb;color:#1e90ff;border:none;border-radius:20px;padding:8px 18px;cursor:pointer;font-weight:bold;margin-bottom:24px;">Mostrar todas las imágenes</button>
    `;
  }

  const galeriaHTML = `
    <div id="galeria-expandida" style="display:none; overflow-x: auto; white-space: nowrap; gap: 12px; margin-bottom: 24px; padding-bottom: 8px;">
      ${imagenes.map((img, i) => `
        <img src="${img}" onclick="verImagenCompleta('${prod.nombre.replace(/'/g, "\\'")}', ${i})"
             style="display:inline-block; width: 220px; height: 140px; object-fit: cover; border-radius: 12px; cursor: pointer; margin-right: 12px;" />
      `).join('')}
    </div>
  `;

  const contadoresHTML = `
    <div style="margin-top:24px;margin-bottom:16px;">
      <h3 style="margin-bottom:10px;">Selecciona tu grupo:</h3>
      ${crearContador('adultos', 'Adultos')}
      ${crearContador('ninos', 'Niños')}
      ${crearContador('bebes', 'Bebés')}
      ${crearContador('mascotas', 'Mascotas')}
    </div>
  `;

  document.getElementById('vista-producto').innerHTML = `
    <div style="padding: 24px; max-width: 960px; margin: auto; font-family: 'Segoe UI', sans-serif;">
      <h1>${prod.nombre}</h1>
      <p><strong>${prod.ciudad}</strong> - ${prod.tipo.toUpperCase()}</p>
      ${collageHTML}
      ${galeriaHTML}
      <p><strong>Precio:</strong> ${prod.precio}</p>
      <p>Una experiencia inolvidable en <strong>${prod.ciudad}</strong>. ¡Reserva ya!</p>
      ${contadoresHTML}

      <div id="form-nombres" style="margin-top: 24px;"></div>

      <div style="margin-top:20px;margin-bottom:10px;">
        <label><strong>Selecciona fecha de reserva:</strong></label><br/>
        <div id="calendario-reserva" style="max-width:300px;"></div>
      </div>

      <a id="btn-wsp"
         class="cta-wsp"
         style="display:inline-block;margin-top:10px;padding:12px 24px;border-radius:20px;background:#25d366;color:#fff;text-decoration:none;">
         Reservar por WhatsApp
      </a>

      <button onclick="compartirProducto()" 
        style="margin-left:12px;background:#f4f8fb;color:#1e90ff;border:none;border-radius:20px;padding:10px 20px;cursor:pointer;font-weight:bold;">
        Compartir
      </button>
      <span id="msg-copiado" style="margin-left:10px;font-size:0.9em;color:green;display:none;">¡Enlace copiado!</span>
    </div>
  `;

  flatpickr("#calendario-reserva", {
    inline: true,
    dateFormat: "Y-m-d",
    minDate: "today",
    onChange: function(selectedDates, dateStr) {
      let hiddenInput = document.getElementById("fecha-reserva");
      if (!hiddenInput) {
        hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.id = "fecha-reserva";
        document.body.appendChild(hiddenInput);
      }
      hiddenInput.value = dateStr;
      actualizarLinkWhatsApp();
    }
  });

  actualizarLinkWhatsApp(prod);
});

function crearContador(id, label) {
  return `
    <div style="display:flex;align-items:center;margin-bottom:10px;">
      <span style="min-width:90px;">${label}:</span>
      <button onclick="cambiarCantidad('${id}', -1)" style="width:32px;height:32px;border:none;background:#ddd;border-radius:50%;font-weight:bold;cursor:pointer;">−</button>
      <span id="count-${id}" style="width:40px;text-align:center;font-weight:bold;">0</span>
      <button onclick="cambiarCantidad('${id}', 1)" style="width:32px;height:32px;border:none;background:#1e90ff;color:white;border-radius:50%;font-weight:bold;cursor:pointer;">+</button>
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
    { id: 'adultos', label: 'Adultos' },
    { id: 'ninos', label: 'Niños' },
    { id: 'bebes', label: 'Bebés' },
    { id: 'mascotas', label: 'Mascotas' }
  ];

  const contenedor = document.getElementById('form-nombres');
  contenedor.innerHTML = '';

  tipos.forEach(({ id, label }) => {
    const cantidad = parseInt(document.getElementById(`count-${id}`).textContent);
    for (let i = 1; i <= cantidad; i++) {
      const div = document.createElement('div');
      div.style = 'margin-bottom:10px;';
      div.innerHTML = `
        <label for="${id}-${i}" style="display:block;font-weight:500;">${label} ${i}:</label>
        <input type="text" id="${id}-${i}" placeholder="Nombre de ${label.toLowerCase()} ${i}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #ccc;" />
      `;
      contenedor.appendChild(div);
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
  const btn = document.getElementById('btn-wsp');
  if (btn) btn.href = url;
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
  lb.style = `
    position:fixed;
    top:0; left:0;
    width:100vw; height:100vh;
    background:rgba(0,0,0,0.95);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:100000;
    flex-direction:column;
  `;

  function render() {
    lb.innerHTML = `
      <button id="lb-prev" style="position:absolute;left:24px;top:50%;transform:translateY(-50%);background:none;border:none;color:#fff;font-size:2.5em;cursor:pointer;z-index:2;">←</button>
      <img src="${imagenes[current]}" alt="imagen" style="max-width:96vw;max-height:88vh;border-radius:12px;box-shadow:0 4px 32px #000;" />
      <button id="lb-next" style="position:absolute;right:24px;top:50%;transform:translateY(-50%);background:none;border:none;color:#fff;font-size:2.5em;cursor:pointer;z-index:2;">→</button>
      <button id="lb-close" style="position:absolute;top:18px;right:24px;background:none;border:none;color:#fff;font-size:2.5em;cursor:pointer;z-index:2;">×</button>
    `;
    document.getElementById('lb-prev').onclick = (e) => { e.stopPropagation(); current = (current - 1 + imagenes.length) % imagenes.length; render(); };
    document.getElementById('lb-next').onclick = (e) => { e.stopPropagation(); current = (current + 1) % imagenes.length; render(); };
    document.getElementById('lb-close').onclick = () => lb.remove();
  }

  lb.onclick = (e) => { if (e.target === lb) lb.remove(); };
  document.body.appendChild(lb);
  render();
};
