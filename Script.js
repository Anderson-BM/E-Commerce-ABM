const url = "https://fakestoreapi.com/products";

// Obtener productos desde la API
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log("Productos obtenidos:", data);
    mostrarProductos(data);
    mostrarCarousel(data);
  })
  .catch(() => console.log("Error al obtener los productos"));

// Función para mostrar productos en tarjetas
function mostrarProductos(productos) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.style.cssText = `
      border: 1px solid #ccc; padding: 15px; width: 250px; text-align: center;
      box-shadow: 2px 2px 10px rgba(0,0,0,0.1); border-radius: 10px; margin: 10px;
    `;

    card.innerHTML = `
      <h3>${producto.title}</h3>
      <img src="${producto.image}" alt="${producto.title}" style="width: 100px; height: 100px;">
      <p>${producto.description.substring(0, 100)}...</p>
      <p><strong>Precio: $${producto.price}</strong></p>
      <button style="background-color: #28a745; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">
        Agregar al carrito
      </button>
      <button class="ver-mas" data-id="${producto.id}" style="background-color: #FFD700; color: black; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">
        Ver Información
      </button>
    `;

    contenedor.appendChild(card);
  });
}

function mostrarCarousel(productos) {
    // Selecciona 3 productos aleatorios
    const aleatorios = productos.sort(() => Math.random() - 0.5).slice(0, 3);
  
    const contenedor = document.querySelector(".carril-carousel");
    if (!contenedor) return; // Evita errores si el contenedor no existe
  
    contenedor.innerHTML = ""; // Limpia el contenido anterior
  
    aleatorios.forEach((producto) => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-carousel");
  
      tarjeta.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}">
        <h3>${producto.title}</h3>
        <button onclick="mostrarModal(${producto.id})">Ver más</button>
      `;
  
      contenedor.appendChild(tarjeta);
    });
  
    iniciarCarousel(); // Llama a la función para iniciar el carrusel
  }
  
  function iniciarCarousel() {
    const carril = document.querySelector(".carril-carousel");
    if (!carril) return;
  
    let index = 0;
    setInterval(() => {
      index = (index + 1) % 3;
      carril.style.transform = `translateX(-${index * 220}px)`;
    }, 3000);
  }
  


// Modal para ver detalles del producto
const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalCategory = document.getElementById("modalCategory");
const modalRating = document.getElementById("modalRating");
const closeModal = document.querySelector(".close");

// Evento de delegación para abrir el modal al hacer click en "Ver Información"
document.getElementById("productos").addEventListener("click", (e) => {
  if (e.target.classList.contains("ver-mas")) {
    const productId = e.target.getAttribute("data-id");
    
    fetch(`${url}/${productId}`)
      .then((response) => response.json())
      .then((producto) => {
        modal.style.display = "flex";
        modalImage.src = producto.image;
        modalTitle.textContent = producto.title;
        modalDescription.textContent = producto.description;
        modalPrice.textContent = producto.price;
        modalCategory.textContent = producto.category;
        modalRating.textContent = producto.rating.rate;
      })
      .catch(() => console.log("Error al obtener detalles del producto"));
  }
});

// Cerrar el modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar el modal si se hace click fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
