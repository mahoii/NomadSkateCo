// cart feature

let cartCount = 0;

function addToCart() {
  cartCount++;

  const cartText = document.getElementById("cart-count");

  cartText.textContent = cartCount + " items in your cart.";
}
