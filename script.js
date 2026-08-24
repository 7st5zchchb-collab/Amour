const images = [
  "photo_2026-08-24_14-43-02.jpg",
  "photo_2026-08-24_14-43-04.jpg",
  "photo_2026-08-24_14-43-06.jpg",
  "photo_2026-08-24_14-43-07.jpg",
  "photo_2026-08-24_14-43-08.jpg",
  "photo_2026-08-24_14-43-09.jpg",
  "photo_2026-08-24_14-43-10.jpg",
  "photo_2026-08-24_14-43-10 (2).jpg",
  "photo_2026-08-24_14-43-11.jpg",
  "photo_2026-08-24_14-43-11 (2).jpg",
  "photo_2026-08-24_14-43-12.jpg",
  "photo_2026-08-24_14-43-13.jpg",
  "photo_2026-08-24_14-43-13 (2).jpg",
  "photo_2026-08-24_14-43-14.jpg",
  "photo_2026-08-24_14-43-14 (2).jpg",
  "photo_2026-08-24_14-43-15.jpg",
  "photo_2026-08-24_14-43-16.jpg",
  "photo_2026-08-24_14-43-16 (2).jpg",
  "photo_2026-08-24_14-43-17.jpg",
  "photo_2026-08-24_14-43-18.jpg",
  "photo_2026-08-24_14-43-18 (2).jpg",
  "photo_2026-08-24_14-43-19.jpg",
  "photo_2026-08-24_14-43-19 (2).jpg",
  "photo_2026-08-24_14-49-03.jpg"
];

const categories = ["makeup", "skincare", "fragrance", "hair"];
const names = ["Velvet Beauty", "Pure Glow", "Rose Touch", "Daily Care", "Soft Bloom", "Beauty Edit", "Silk Care", "Amour Collection"];
const prices = [18,25,32,39,46,53,60,24,31,38,45,52,59,23,30,37,44,51,58,22,29,36,43,50];

const products = images.map((image, i) => ({
  id: i,
  image,
  name: i < 8 ? names[i] : `${names[i % names.length]} ${Math.floor(i / 8) + 1}`,
  category: categories[i % categories.length],
  price: prices[i]
}));

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const productsContainer = $("#products");
const productCount = $("#productCount");
const cartCount = $("#cartCount");
const cartItems = $("#cartItems");
const cartTotal = $("#cartTotal");
const cartOverlay = $("#cartOverlay");
const searchBox = $("#searchBox");
const searchInput = $("#searchInput");
const nav = $("#nav");

let cart = [];

function displayProducts(list) {
  if (!productsContainer) return;
  if (productCount) productCount.textContent = list.length;

  if (!list.length) {
    productsContainer.innerHTML = '<div class="empty-products">No beauty products found.</div>';
    return;
  }

  productsContainer.innerHTML = list.map(product => `
    <article class="product">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <button class="wishlist" type="button" data-wish="false" aria-label="Add ${product.name} to wishlist">♡</button>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category === "hair" ? "Hair Care" : product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-bottom">
          <span class="price">$${product.price.toFixed(2)}</span>
          <button class="add-cart" type="button" data-index="${product.id}">Add to bag</button>
        </div>
      </div>
    </article>
  `).join("");

  $$(".add-cart").forEach(button => {
    button.addEventListener("click", () => addToCart(Number(button.dataset.index)));
  });

  $$(".wishlist").forEach(button => {
    button.addEventListener("click", () => {
      const active = button.dataset.wish === "true";
      button.dataset.wish = String(!active);
      button.textContent = active ? "♡" : "♥";
      button.classList.toggle("active", !active);
      button.setAttribute("aria-label", active ? "Add to wishlist" : "Remove from wishlist");
    });
  });
}

function updateCart() {
  if (!cartCount || !cartItems || !cartTotal) return;

  cartCount.textContent = cart.length;

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your bag is empty.</p>';
    cartTotal.textContent = "$0.00";
    return;
  }

  let total = 0;
  cartItems.innerHTML = cart.map((product, index) => {
    total += product.price;
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}">
        <div><h4>${product.name}</h4><p>$${product.price.toFixed(2)}</p></div>
        <button class="remove-item" type="button" data-remove="${index}" aria-label="Remove ${product.name}">×</button>
      </div>
    `;
  }).join("");

  cartTotal.textContent = `$${total.toFixed(2)}`;

  $$('[data-remove]').forEach(button => {
    button.addEventListener("click", () => {
      cart.splice(Number(button.dataset.remove), 1);
      updateCart();
    });
  });
}

function openCart() {
  cartOverlay?.classList.add("show");
  cartOverlay?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartOverlay?.classList.remove("show");
  cartOverlay?.setAttribute("aria-hidden", "true");
  if (!searchBox?.classList.contains("show")) document.body.style.overflow = "";
}

function addToCart(index) {
  const product = products[index];
  if (!product) return;
  cart.push(product);
  updateCart();
  openCart();
}

function filterProducts(category) {
  displayProducts(category === "all" ? products : products.filter(product => product.category === category));
}

// Category filtering
$$('.category').forEach(button => {
  button.addEventListener("click", () => {
    $$('.category').forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    filterProducts(button.dataset.category);
  });
});

// Cart
$("#cartBtn")?.addEventListener("click", openCart);
$("#closeCart")?.addEventListener("click", closeCart);
cartOverlay?.addEventListener("click", event => {
  if (event.target === cartOverlay) closeCart();
});

$("#checkoutBtn")?.addEventListener("click", () => {
  if (!cart.length) {
    alert("Your bag is empty.");
    return;
  }
  alert("Checkout is ready to be connected to your payment system.");
});

// Search
$("#searchBtn")?.addEventListener("click", () => {
  searchBox?.classList.add("show");
  searchBox?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => searchInput?.focus(), 120);
});

function closeSearch() {
  searchBox?.classList.remove("show");
  searchBox?.setAttribute("aria-hidden", "true");
  if (searchInput) searchInput.value = "";
  filterProducts("all");
  $$('.category').forEach(item => item.classList.toggle("active", item.dataset.category === "all"));
  if (!cartOverlay?.classList.contains("show")) document.body.style.overflow = "";
}

$("#closeSearch")?.addEventListener("click", closeSearch);
searchBox?.addEventListener("click", event => {
  if (event.target === searchBox) closeSearch();
});

searchInput?.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(value) || product.category.toLowerCase().includes(value)
  );
  displayProducts(filtered);
});

// Mobile navigation
$("#menuBtn")?.addEventListener("click", () => {
  nav?.classList.toggle("show");
});

nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("show"));
});

// Escape closes overlays
window.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  if (searchBox?.classList.contains("show")) closeSearch();
  if (cartOverlay?.classList.contains("show")) closeCart();
  nav?.classList.remove("show");
});

// Initial render
displayProducts(products);
updateCart();
if ($("#year")) $("#year").textContent = new Date().getFullYear();
