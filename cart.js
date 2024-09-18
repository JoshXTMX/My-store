document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
  
    let total = 0;
  
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p class="price">$${item.price}</p>
          <p>Cantidad: ${item.quantity}</p>
        </div>
      `;
  
      cartContainer.appendChild(cartItem);
      total += parseFloat(item.price) * item.quantity;
    });
  
    cartTotal.textContent = total.toFixed(2);
  });
  