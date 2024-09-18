document.addEventListener("DOMContentLoaded", function () {
    // Toggle dark mode
    document
      .getElementById("darkModeButton")
      .addEventListener("click", function () {
        const darkMode = document.body.classList.toggle("dark-mode");
        document.getElementById("darkModeIcon").textContent = darkMode
          ? "light_mode"
          : "contrast";
      });
  
    // Initial setup for sections
    showSection("home");
  
    // Load featured products
    loadFeaturedProducts();
  
    // Load cart items if any
    loadCartItems();
  });
  
  function showSection(sectionId) {
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
  }
  
  function loadFeaturedProducts() {
    // Fetch products from FakeStoreAPI
    fetch("https://fakestoreapi.com/products?limit=5")
      .then((response) => response.json())
      .then((products) => {
        const featuredProducts = document.getElementById("featured-products");
        featuredProducts.innerHTML = "";
        products.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.className = "product-card";
          productCard.innerHTML = `
                      <img src="${product.image}" alt="${product.title}">
                      <div class="product-card-content">
                          <h3>${product.title}</h3>
                          <p>${product.description}</p>
                          <p class="price">$${product.price}</p>
                          <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
                      </div>
                  `;
          featuredProducts.appendChild(productCard);
        });
      });
  }
  
  function searchProducts() {
    const query = document.getElementById("search").value.toLowerCase();
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((products) => {
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(query)
        );
        const productGrid = document.getElementById("product-grid");
        productGrid.innerHTML = "";
        filteredProducts.slice(0, 10).forEach((product) => {
          const productCard = document.createElement("div");
          productCard.className = "product-card";
          productCard.innerHTML = `
                      <img src="${product.image}" alt="${product.title}">
                      <div class="product-card-content">
                          <h3>${product.title}</h3>
                          <p>${product.description}</p>
                          <p class="price">$${product.price}</p>
                          <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
                      </div>
                  `;
          productGrid.appendChild(productCard);
        });
      });
  }
  

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para agregar al carrito
function addToCart(productCard) {
  const productId = productCard.getAttribute('data-id');
  const productName = productCard.querySelector('h3').textContent;
  const productDescription = productCard.querySelector('p').textContent;
  const productPrice = productCard.querySelector('.price').textContent.replace('US$', '');
  const productImage = productCard.querySelector('img').src;

  // Crear el producto a agregar
  const item = {
    id: productId,
    name: productName,
    description: productDescription,
    price: parseFloat(productPrice),
    image: productImage,
    quantity: 1
  };

  // Verificar si el producto ya está en el carrito
  const existingProductIndex = cart.findIndex(item => item.id === productId);
  if (existingProductIndex !== -1) {
    // Si existe, aumentar la cantidad
    cart[existingProductIndex].quantity += 1;
  } else {
    // Si no existe, añadirlo al carrito
    cart.push(item);
  }

  // Guardar el carrito en localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log(cart);
}

// Asociar el evento de clic a los botones "Agregar al carrito"
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const productCard = this.closest('.product-card'); // Cambié de '.product' a '.product-card'
    addToCart(productCard);
  });
});

  
  function toggleForm() {
    document.getElementById("login-form").classList.toggle("active");
    document.getElementById("signup-form").classList.toggle("active");
  }
  