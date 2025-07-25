// ✅ Definición de productos turísticos
const productos = [
  {
    ciudad: "San Andrés",
    nombre: "Viaje completo 4 días",
    tipo: "viaje",
    imagen: "img/sanandres.jpg",
    imagenes: [
      "img/sanandres.jpg",
      "img/sanandres2.jpg",
      "img/sanandres3.jpg"
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
      "img/baru3.jpg"
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
      "img/santamarta.jpg",
      "img/santamarta2.jpg",
      "img/santamarta3.jpg"
    ],
    precioCOP: 800000,
    descripcion: "Aventura de varios días en la Sierra Nevada hasta Ciudad Perdida, una experiencia mágica llena de historia y naturaleza."
  },
  {
  ciudad: "San Andrés",
  nombre: "Tour Acuático en Johnny Cay",
  tipo: "tour",
  imagen: "img/sanandres2.jpg",
  imagenes: [
    "img/sanandres2.jpg",
    "img/sanandres3.jpg",
    "img/sanandres.jpg"
  ],
  precioCOP: 150000,
  descripcion: "Explora Johnny Cay con guía local, disfruta de playas cristalinas, snorkeling y almuerzo típico isleño."
},
{
  ciudad: "Cartagena",
  nombre: "Recorrido en Chiva Rumbera",
  tipo: "pasadía",
  imagen: "img/baru2.jpg",
  imagenes: [
    "img/baru2.jpg",
    "img/baru.jpg",
    "img/baru3.jpg"
  ],
  precioCOP: 70000,
  descripcion: "Vive la fiesta cartagenera en una chiva rumbera con música, bebidas, y paradas por sitios emblemáticos."
},
{
  ciudad: "Santa Marta",
  nombre: "Día de Playa en Bahía Concha",
  tipo: "pasadía",
  imagen: "img/santamarta2.jpg",
  imagenes: [
    "img/santamarta2.jpg",
    "img/santamarta.jpg",
    "img/santamarta3.jpg"
  ],
  precioCOP: 85000,
  descripcion: "Relájate en Bahía Concha, una joya del Parque Tayrona. Transporte, entrada y refrigerio incluidos."
},
{
  ciudad: "Cartagena",
  nombre: "Crucero al atardecer con cena",
  tipo: "viaje",
  imagen: "img/baru3.jpg",
  imagenes: [
    "img/baru3.jpg",
    "img/baru.jpg",
    "img/baru2.jpg"
  ],
  precioCOP: 180000,
  descripcion: "Navega por la bahía de Cartagena al atardecer mientras disfrutas de una cena gourmet a bordo."
},
{
  ciudad: "Santa Marta",
  nombre: "Tour indígena en Sierra Nevada",
  tipo: "tour",
  imagen: "img/santamarta3.jpg",
  imagenes: [
    "img/santamarta3.jpg",
    "img/santamarta2.jpg",
    "img/santamarta.jpg"
  ],
  precioCOP: 250000,
  descripcion: "Adéntrate en la cultura indígena Wiwa en una experiencia única de aprendizaje y conexión con la naturaleza."
},
{
  ciudad: "San Andrés",
  nombre: "Buceo en arrecifes coralinos",
  tipo: "pasadía",
  imagen: "img/sanandres3.jpg",
  imagenes: [
    "img/sanandres3.jpg",
    "img/sanandres.jpg",
    "img/sanandres2.jpg"
  ],
  precioCOP: 220000,
  descripcion: "Explora el increíble ecosistema submarino de San Andrés con todo el equipo incluido y guía profesional."
},

];



// Función para abrir el panel
function abrirMenu() {
  const panel = document.getElementById('panelMenu');
  panel.style.display = 'flex'; // Muestra el panel
      document.body.classList.add('body-no-scroll'); // 🚫 desactiva scroll
}

// Función para cerrar el panel
function cerrarMenu() {
  const panel = document.getElementById('panelMenu');
  panel.style.display = 'none'; // Oculta el panel
      document.body.classList.remove('body-no-scroll'); // ✅ vuelve a activar scroll
}








// ✅ Abre el modal con ID "modal-moneda"
function abrirModalIdiomaMoneda() {
  const modal = document.getElementById('modal-moneda');
  if (modal) {
    modal.classList.remove('oculto');
    modal.style.display = 'flex';
    document.body.classList.add('body-no-scroll'); // 🚫 desactiva scroll
  }
}


// ✅ Cierra el modal
function cerrarModalIdiomaMoneda() {
  const modal = document.getElementById('modal-moneda');
  if (modal) {
    modal.classList.add('oculto');
    modal.style.display = 'none';
    document.body.classList.remove('body-no-scroll'); // ✅ vuelve a activar scroll
  }
}


// ✅ Agrega evento para abrir modal desde botón o ícono
// Ejemplo: botón con id "abrir-configuracion"
document.addEventListener('DOMContentLoaded', () => {
  const btnAbrir = document.getElementById('abrir-configuracion');
  if (btnAbrir) {
    btnAbrir.addEventListener('click', abrirModalIdiomaMoneda);
  }
});



const simbolos = {
  COP: "$", USD: "US$", EUR: "€", MXN: "MX$",
  ARS: "AR$", BRL: "R$", GBP: "£", CLP: "CLP$", PEN: "S/"
};

function normalizarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9\s]/gi, '');
}

function obtenerPrecioTexto(producto) {
  const moneda = localStorage.getItem('monedaSeleccionada') || 'COP';
  const tasas = JSON.parse(localStorage.getItem('tasasCambio')) || { COP: 1 };
  const tasa = tasas[moneda] || 1;
  const simbolo = simbolos[moneda] || '';
  const precio = producto.precioCOP * tasa;

  return moneda === 'COP'
    ? `${simbolo} ${Math.round(precio).toLocaleString('es-CO')}`
    : `${simbolo} ${precio.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

















function abrirModalProducto(prod) {
  const precioTexto = obtenerPrecioTexto(prod);
  const modal = document.createElement('div');
  modal.className = 'modal-producto';

  // Evita scroll de fondo
  document.body.classList.add('body-no-scroll');

  modal.innerHTML = `
    <div class="contenido-modal">
      <div class="barra-superior-modal">
        <img src="iconos/volver.png" alt="Cerrar" class="icono-cerrar" onclick="cerrarModalProducto(this)">
      </div>

      <!-- Collage -->
      <div class="collage-principal">
        <div class="imagen-grande">
          <img src="${prod.imagenes[0]}">
        </div>
        <div class="imagenes-pequenas">
          <img src="${prod.imagenes[1]}">
          <img src="${prod.imagenes[2]}">
        </div>
      </div>

      <!-- Galería secundaria -->
      <div class="galeria">
        ${prod.imagenes.map(img => `<img src="${img}">`).join('')}
      </div>

      <h2 id="productomodal">${prod.nombre}</h2>
      <p id="ciudad"><strong>${prod.ciudad}</strong> - ${prod.tipo.toUpperCase()}</p>
      <span id="precio">${precioTexto}</span>

      <p class="descripcion-producto">${prod.descripcion}</p>

<div class="reserva-flex">
  <!-- Calendario -->
  <div class="contenedor-calendario">
    <div id="fecha-reserva"></div>
  </div>

  <!-- Contadores -->
  <div class="contadores">
    ${[
      { tipo: "Adultos", edad: "13 o más años" },
      { tipo: "Niños", edad: "3 a 12 años" },
      { tipo: "Bebés", edad: "0 a 2 años" },
      { tipo: "Mascotas", edad: "Cualquier edad" }
    ].map(({ tipo, edad }) => `
      <div class="contador" data-tipo="${tipo.toLowerCase()}">
        <div class="fila-contador">
          <div class="info-contador">
            <span class="tipo-contador">${tipo}</span>
            <span class="edad-contador">${edad}</span>
          </div>
          <div class="botones-contador">
            <button type="button" onclick="modificarContador(this, -1)">−</button>
            <span class="valor">0</span>
            <button type="button" onclick="modificarContador(this, 1)">+</button>
          </div>
        </div>
        <div class="campos-nombres"></div>
      </div>
    `).join('')}
  </div>
  <p>
  
  
  
  
  
  
  
  
  
  
  
  Reiniciar la animación de "shake": Cada vez que un campo es validado, el restartShake es llamado. Esto permite que el campo "tiemble" hasta que el usuario lo complete.

Animación en el calendario: La clase error se añade al calendario si no hay fecha seleccionada. Cuando la clase error está activa, el calendario recibirá la animación de "shake".

Visibilidad del calendario: Si el calendario está vacío, la página se desplazará suavemente hacia él.

Resumen:
Animación: Se asegurará de que el calendario "tiemble" si no está completo (fecha no seleccionada).

Desaparecer el rojo: El borde rojo desaparece una vez el usuario selecciona la fecha.

Repetición de la animación: El "shake" se ejecuta de manera continua hasta que el calendario esté correctamente completado.

Con esto, el calendario debería mostrar la animación de "shake" correctamente en PC y móviles. ¡Prueba y dime si ahora se comporta como esperas!
  
  
  
  
  
  
  
  
  
  
  
  </p>
</div>

      <!-- Footer fijo -->
      <div class="footer-modal">
        <div class="contenido-footer">
          <div class="bloque-precio">
            <div class="fila-secundaria">
              <div id="precio-total"
                   data-precio-base="${prod.precioCOP}"
                   data-simbolo="${precioTexto.match(/[^\d.,\s]+/g)?.[0] || '$'}"
                   class="precio-grande">
                ${precioTexto}
                <span class="etiqueta-precio">Precio</span>
              </div>
<a id="btn-whatsapp"
   target="_blank"
   class="btn-wsp">
   Reservar por WhatsApp
</a>

            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);





const btnWhatsApp = modal.querySelector('#btn-whatsapp');
const numero = "3239717041";

btnWhatsApp.addEventListener('click', function (e) {
  const nombreProducto = prod.nombre;
  const ciudad = prod.ciudad;
  const tipo = prod.tipo;

  // Obtener fecha del calendario
  const calendario = flatpickrInstance?.selectedDates?.[0];
  const fecha = calendario
    ? calendario.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : null;

  const contadores = modal.querySelectorAll('.contador');
  let cantidades = '';
  let hayAdultos = false;
  let hayAlMenosUnNombre = false;

  // Limpiar errores visuales anteriores
  modal.querySelectorAll('.shake').forEach(el => el.classList.remove('shake'));

  contadores.forEach(cont => {
    const tipo = cont.dataset.tipo;
    const tipoCapitalizado = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    const cantidad = parseInt(cont.querySelector('.valor').textContent);

    if (tipo === 'adultos' && cantidad > 0) hayAdultos = true;
    if (cantidad === 0) return;

    cantidades += `*${tipoCapitalizado}:* ${cantidad}\n`;

    // Nombres
    const camposNombres = cont.querySelectorAll('input');
    camposNombres.forEach(input => {
      const nombre = input.value.trim();
      if (nombre) {
        cantidades += `${nombre}\n`;
        hayAlMenosUnNombre = true;
      }
    });

    cantidades += `\n`;
  });

  let valid = true;

  // Validar adultos
  if (!hayAdultos) {
    valid = false;
    const contAdultos = modal.querySelector('.contador[data-tipo="adultos"]');
    contAdultos.classList.add('error');
    restartShake(contAdultos); // Ejecuta shake continuo
  }

  // Validar fecha (calendario)
  if (!fecha) {
    valid = false;
    const calendarioEl = modal.querySelector('.flatpickr-calendar.inline'); // Aplica al contenedor del calendario
    calendarioEl.classList.add('error');
    restartShake(calendarioEl); // Ejecuta shake en el calendario
  }

  // Validar nombres
  if (!hayAlMenosUnNombre) {
    valid = false;
    modal.querySelectorAll('.contador input').forEach(input => {
      if (input.value.trim() === '') {
        input.classList.add('error');
        restartShake(input); // Ejecuta shake continuo
      }
    });
  }

  // Si hay errores, prevenir el envío y hacer scroll
  if (!valid) {
    e.preventDefault();

    // Scroll al primer campo con error si no está visible
    const primerError = modal.querySelector('.error');
    if (primerError && !isElementInViewport(primerError)) {
      primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return;
  }

  // Generar el mensaje para WhatsApp
  const precioTotal = modal.querySelector('#precio-total').textContent.trim();
  const mensaje = `*Hola, quiero reservar en Jexpedition*\n\n*${nombreProducto}*\n*${ciudad}* - *${tipo.toUpperCase()}*\n*Fecha:* ${fecha}\n\n${cantidades}*Precio total:* ${precioTotal}`;
  const url = `https://wa.me/57${numero}?text=${encodeURIComponent(mensaje)}`;
  btnWhatsApp.href = url;
});

// Remover la clase error y shake cuando el usuario llena el campo
modal.querySelectorAll('input, .flatpickr-input').forEach(input => {
  input.addEventListener('input', function () {
    if (input.value.trim() !== '') {
      input.classList.remove('error', 'shake');
    }
  });
});

// Función para reiniciar la animación de shake
function restartShake(element) {
  element.classList.add('shake');
  
  // Elimina la clase 'shake' y 'error' después de 0.5 segundos
  setTimeout(() => {
    element.classList.remove('shake', 'error');
  }, 1000); // 500ms es el tiempo de la animación
}


// Función para verificar si el elemento está visible en el viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}













// Define la variable arriba
let flatpickrInstance;

// Inicializa Flatpickr y guarda la instancia
if (window.flatpickr) {
  flatpickrInstance = flatpickr("#fecha-reserva", {
    inline: true,
    minDate: "today",
    dateFormat: "Y-m-d",
    locale: "es"
  });
}




  // Agregar evento para abrir visor en imágenes del collage y galería
const todasLasImagenes = modal.querySelectorAll('.collage-principal img, .galeria img');
todasLasImagenes.forEach(img => {
  const src = img.getAttribute('src');
  const index = prod.imagenes.indexOf(src);
  if (index !== -1) {
    img.addEventListener('click', () => abrirVisorImagenes(prod.imagenes, index));
  }
});


if (!document.getElementById('visor-imagenes')) {
  const visor = document.createElement('div');
  visor.id = 'visor-imagenes';
  visor.innerHTML = `
    <div class="fondo-visor" onclick="cerrarVisorImagenes()"></div>
    <div class="contenido-visor">
      <button class="btn-navegar prev" onclick="cambiarImagen(-1)">❮</button>
      <img id="imagen-grande-visor" src="" alt="imagen ampliada">
      <button class="btn-navegar next" onclick="cambiarImagen(1)">❯</button>
    </div>
    <button class="btn-cerrar-visor" onclick="cerrarVisorImagenes()">×</button>
  `;
  document.body.appendChild(visor);
}

}

let imagenesVisor = [];
let indiceActual = 0;

function abrirVisorImagenes(listaImagenes, indiceInicial) {
  if (!Array.isArray(listaImagenes) || !listaImagenes[indiceInicial]) {
    console.error('No se pudo abrir la imagen, lista inválida:', listaImagenes);
    return;
  }

  imagenesVisor = listaImagenes;
  indiceActual = indiceInicial;

  const visor = document.getElementById('visor-imagenes');
  const img = document.getElementById('imagen-grande-visor');

  if (visor && img) {
    visor.classList.add('visible');
    img.src = imagenesVisor[indiceActual];
  }
}



function cerrarVisorImagenes() {
  const visor = document.getElementById('visor-imagenes');
  if (visor) {
    visor.classList.remove('visible');
    document.body.classList.remove('body-no-scroll');
  }
}

function cambiarImagen(direccion) {
  indiceActual += direccion;
  if (indiceActual < 0) indiceActual = imagenesVisor.length - 1;
  if (indiceActual >= imagenesVisor.length) indiceActual = 0;

  const imgElemento = document.getElementById('imagen-grande-visor');
  if (imgElemento) {
    imgElemento.style.opacity = 0;
    setTimeout(() => {
      imgElemento.src = imagenesVisor[indiceActual];
      imgElemento.style.opacity = 1;
    }, 200);
  }
}


// Navegación con teclado dentro del visor
document.addEventListener('keydown', (e) => {
  const visor = document.getElementById('visor-imagenes');
  if (!visor || !visor.classList.contains('visible')) return;

  if (e.key === 'ArrowLeft') {
    cambiarImagen(-1);
  } else if (e.key === 'ArrowRight') {
    cambiarImagen(1);
  } else if (e.key === 'Escape') {
    cerrarVisorImagenes();
  }
});

















function modificarContador(btn, delta) {
  const contador = btn.closest('.contador');
  const valorSpan = contador.querySelector('.valor');
  const campos = contador.querySelector('.campos-nombres');
  const tipo = contador.dataset.tipo;
  let valor = parseInt(valorSpan.textContent);

  if (delta === 1) {
    valor++;
    const input = document.createElement('input');
    input.type = 'text';
    input.name = `${tipo}-${valor}`;
    input.placeholder = `Nombre de ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} ${valor}`;
    input.classList.add('input-nombre');
    campos.appendChild(input);
  } else if (delta === -1 && valor > 0) {
    campos.removeChild(campos.lastElementChild);
    valor--;
  }

valorSpan.textContent = valor;
actualizarPrecioTotal(); // ✅ esta llamada es clave

}


function cerrarModalProducto(btn) {
  const modal = btn.closest('.modal-producto');
  if (modal) {
    modal.remove();
    document.body.classList.remove('body-no-scroll');
  }
}



function actualizarPrecioTotal() {
  const precioTotalEl = document.getElementById('precio-total');
  if (!precioTotalEl) return;

  const baseCOP = parseFloat(precioTotalEl.dataset.precioBase) || 0;
  const simbolo = precioTotalEl.dataset.simbolo || '$';

  const moneda = localStorage.getItem('monedaSeleccionada') || 'COP';
  const tasas = JSON.parse(localStorage.getItem('tasasCambio')) || { COP: 1 };
  const tasa = tasas[moneda] || 1;

  // Sumar solo adultos, niños y bebés (excluye mascotas)
  const totalPersonas = Array.from(document.querySelectorAll('.contador')).reduce((sum, cont) => {
    const tipo = cont.dataset.tipo;
    if (tipo === 'mascotas') return sum; // 👈 Ignoramos mascotas
    const cantidad = parseInt(cont.querySelector('.valor')?.textContent || '0');
    return sum + cantidad;
  }, 0);

  const cantidad = totalPersonas > 0 ? totalPersonas : 1;
  const total = baseCOP * cantidad * tasa;

  const formateado = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: moneda === 'COP' ? 0 : 2,
    maximumFractionDigits: moneda === 'COP' ? 0 : 2
  }).format(total);

  precioTotalEl.innerHTML = `
    ${simbolo} ${formateado}
  `;
}

























function mostrarProductos(lista) {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const card = document.createElement("div");
    card.className = "producto animar";
    card.setAttribute("data-nombre", normalizarTexto(p.nombre));
    card.setAttribute("data-destino", normalizarTexto(p.ciudad));

    const precioTexto = obtenerPrecioTexto(p);

    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="producto-img" />
      <div class="info">
        <h3 class="producto-nombre">${p.nombre}</h3>
        <p class="producto-ciudad"><strong>${p.ciudad}</strong></p>
        <p class="producto-tipo">${p.tipo.charAt(0).toUpperCase() + p.tipo.slice(1)}</p>
        <p class="precio" data-precio-base="${p.precioCOP}"><strong>${precioTexto}</strong></p>
      </div>
    `;
    card.onclick = () => abrirModalProducto(p);
    contenedor.appendChild(card);
    setTimeout(() => card.classList.add("visible"), 100);
  });

  actualizarPrecios();
}

function actualizarPrecios() {
  document.querySelectorAll('[data-precio-base]').forEach(el => {
    const base = parseFloat(el.dataset.precioBase);
    el.innerHTML = `<strong>${formatearMoneda(base * tasaConversion)}</strong>`;
  });
}

function formatearMoneda(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: monedaSeleccionada
  }).format(valor);
}

// --- tasas de cambio ---
function cargarTasaMoneda() {
  if (monedaSeleccionada === 'COP') {
    tasaConversion = 1;
    actualizarPrecios();
    return;
  }
  fetch('https://open.er-api.com/v6/latest/COP')
    .then(res => res.json())
    .then(data => {
      tasaConversion = data.rates?.[monedaSeleccionada] || 1;
      localStorage.setItem('tasasCambio', JSON.stringify(data.rates));
      actualizarPrecios();
    })
    .catch(() => {
      tasaConversion = 1;
      actualizarPrecios();
    });
}

let tasaConversion = 1;
let monedaSeleccionada = localStorage.getItem('monedaSeleccionada') || 'COP';

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('selector-moneda');
  if (selector) {
    selector.value = monedaSeleccionada;
    selector.addEventListener('change', e => {
      monedaSeleccionada = e.target.value;
      localStorage.setItem('monedaSeleccionada', monedaSeleccionada);
      cargarTasaMoneda();
    });
  }
  cargarTasaMoneda();
  mostrarProductos(productos);
});























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

