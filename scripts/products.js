// scripts/products.js

// Keep all products in memory so we can filter them
let allProducts = [];

// The container where cards go
const productsContainer = document.getElementById("products-row");

// Render a list of products to the page
function renderProducts(list) {
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  list.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-6 mb-4";

    const card = document.createElement("div");
    card.className = "product-card h-100";
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      window.location.href = `item?id=${product.id}`;
    });

    const img = document.createElement("img");
    img.src = product.image;
    img.className = "card-img-top";
    img.alt = product.name;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body text-center";

    const title = document.createElement("h5");
    title.className = "product-title";
    title.textContent = product.name;

    // ⭐ Convert numeric rating to stars
    const stars = document.createElement("div");
    stars.className = "star-rating";

    const fullStars = Math.floor(product.rating);
    const halfStar = product.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let starHTML = "";

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starHTML += `<span class="star">★</span>`;
    }

    // Half star
    if (halfStar) {
      starHTML += `<span class="star half-star">★</span>`;
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      starHTML += `<span class="star empty">★</span>`;
    }

    stars.innerHTML = starHTML;

    const price = document.createElement("p");
    price.className = "card-text price-text";
    price.textContent = `$${product.price.toFixed(2)}`;

    const button = document.createElement("button");
    button.className = "btn-primary";
    button.textContent = "Add to cart";

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(product);
    });

    cardBody.append(title, stars, price, button);
    card.append(img, cardBody);
    col.appendChild(card);
    productsContainer.appendChild(col);
  });
}

// Set up search bar to filter products
function setupSearch() {
  const searchForm = document.getElementById("search-bar");
  const searchInput = document.getElementById("search-input");

  // Only run on pages that actually have the search bar + products
  if (!searchForm || !searchInput || !productsContainer) return;

  function handleSearch(event) {
    if (event) event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    // If search is empty, show all products again
    if (!query) {
      renderProducts(allProducts);
      return;
    }

    // Filter by name or description
    const filtered = allProducts.filter((product) => {
      const name = product.name.toLowerCase();
      const desc = (product.description || "").toLowerCase();
      return name.includes(query) || desc.includes(query);
    });

    renderProducts(filtered);
  }

  // Search on submit (pressing Enter)
  searchForm.addEventListener("submit", handleSearch);

  // Live search as you type (optional but nice)
  searchInput.addEventListener("input", handleSearch);
}

// Only run fetch on pages that actually have the products row
if (productsContainer) {
  fetch("data/products.json")
    .then((res) => res.json())
    .then((products) => {
      allProducts = products;
      renderProducts(products); // show everything at first
      setupSearch(); // then wire up the search bar
    })
    .catch((err) => console.error("Error loading products:", err));
}

// Example Add to Cart function (you can replace this with real cart logic)
function addToCart(product) {
  console.log("Added to cart:", product.name);
}
