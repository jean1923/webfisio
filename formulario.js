// Función para mostrar/ocultar el formulario
function toggleFormulario() {
    const formulario = document.getElementById("formulario");
    if (formulario.style.display === "none" || formulario.style.display === "") {
        formulario.style.display = "block"; // Muestra el formulario
    } else {
        formulario.style.display = "none"; // Oculta el formulario
    }
}

// Función para manejar el inicio de sesión (simulado)
function iniciarSesion() {
    const name = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    alert("Inicio de sesión exitoso\n" +
          `Nombre: ${name}\n` +
          `Contraseña: ${password}`);
}

  // Array simulado de productos en el carrito (puede ser dinámico)
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Referencias a elementos del DOM
const cartContainer = document.getElementById("cart-items");
const totalItemsContainer = document.getElementById("total-items");
const subtotalContainer = document.getElementById("subtotal");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Función para renderizar los productos en el carrito
function renderCart() {
  cartContainer.innerHTML = "";
  let totalItems = 0;
  let subtotal = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalItemsContainer.innerText = "0";
    subtotalContainer.innerText = "$0.00";
    return;
  }

  cartItems.forEach((item, index) => {
    totalItems += item.quantity;
    subtotal += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)} x ${item.quantity} unidad(es)</p>
      </div>
      <div class="cart-item-actions">
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
        <button class="btn-danger" onclick="removeItem(${index})">Eliminar</button>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });

  totalItemsContainer.innerText = totalItems;
  subtotalContainer.innerText = `$${subtotal.toFixed(2)}`;
}

// Función para actualizar la cantidad de un producto
function updateQuantity(index, newQuantity) {
  if (newQuantity < 1) return;
  cartItems[index].quantity = parseInt(newQuantity, 10);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCart();
}

// Función para eliminar un producto
function removeItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCart();
}

// Vaciar el carrito
clearCartBtn.addEventListener("click", () => {
  localStorage.removeItem("cartItems");
  renderCart();
});

// Inicializar el carrito
renderCart();
