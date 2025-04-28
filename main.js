// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-list a');
  const content = document.getElementById('dynamic-content');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Solo prevenir comportamiento por defecto si es un enlace interno
      if (href && href.endsWith('.html')) {
        e.preventDefault();

        fetch(href)
          .then(response => {
            if (!response.ok) throw new Error('Error al cargar contenido');
            return response.text();
          })
          .then(html => {
            content.innerHTML = html;
            window.scrollTo({ top: content.offsetTop, behavior: 'smooth' });
          })
          .catch(error => {
            content.innerHTML = `<p>Error al cargar el contenido.</p>`;
            console.error(error);
          });
      }
    });
  });
});
// js/modal.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('modal cargado'); // Esto es solo para verificar que el script se cargó

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">×</span>
      <p class="product-info"></p>
      <button class="add-to-cart">Añadir al carrito</button>
    </div>
  `;
  document.body.appendChild(modal);

  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    product.addEventListener('click', () => {
      const name = product.getAttribute('data-name');
      const price = product.getAttribute('data-price');
      modal.querySelector('.product-info').textContent = `${name} - $${price}`;
      modal.style.display = 'flex';
    });
  });

  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
  });
});

/* CARRUCEL DE IAMGENES*/
document.addEventListener("DOMContentLoaded", () => {
  const carrusel = document.querySelector(".carrusel-ofertas");
  const indicadores = document.querySelectorAll(".indicadores span");
  const totalReal = indicadores.length;
  const visible = 4;
  let index = 1; // Inicia en la PRIMERA IMAGEN REAL (por el clon al inicio)
  let interval;

  const ofertas = document.querySelectorAll(".carrusel-ofertas .oferta");
  const porcentaje = 100 / visible;

  // Posicionar el carrusel en la primera imagen real
  carrusel.style.transform = `translateX(-${index * porcentaje}%)`;

  function actualizarCarrusel(transicion = true) {
    if (transicion) {
      carrusel.style.transition = "transform 0.5s ease-in-out";
    } else {
      carrusel.style.transition = "none";
    }

    carrusel.style.transform = `translateX(-${index * porcentaje}%)`;

    // Indicadores (sin contar clones)
    indicadores.forEach(dot => dot.classList.remove("activo"));
    indicadores[index - 1 === totalReal ? 0 : (index - 1 + totalReal) % totalReal].classList.add("activo");
  }

  function iniciarAutoSlide() {
    interval = setInterval(() => {
      index++;
      actualizarCarrusel();

      carrusel.addEventListener("transitionend", () => {
        if (index === totalReal + 1) { // al llegar al clon de la primera
          index = 1;
          actualizarCarrusel(false);
        }
      }, { once: true });
    }, 3000);
  }

  function detenerAutoSlide() {
    clearInterval(interval);
  }

  indicadores.forEach(dot => {
    dot.addEventListener("click", () => {
      detenerAutoSlide();
      index = parseInt(dot.getAttribute("data-index")) + 1;
      actualizarCarrusel();
      iniciarAutoSlide();
    });
  });

  // Iniciar auto slide
  iniciarAutoSlide();
});
