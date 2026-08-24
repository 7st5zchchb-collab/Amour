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
const names = [
  "Velvet Beauty", "Pure Glow", "Rose Touch", "Daily Care",
  "Soft Bloom", "Beauty Edit", "Silk Care", "Amour Collection"
];

const products = images.map((image, i) => ({
  image,
  name: names[i % names.length],
  category: categories[i % categories.length],
  price: 18 + (i * 7) % 43
}));

const productsContainer = document.getElementById("products");
const productCount = document.getElementById("productCount");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartOverlay = document.getElementById("cartOverlay");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const nav = document.getElementById("nav");

let cart = [];

function displayProducts(list) {
  if (!productsContainer || !productCount) return;

  productCount.textContent = list.length;
  productsContainer.innerHTML = list.map((product) => {
    const index = products.indexOf(product);
    return `
      <article class="product">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <button class="wishlist" type="button" data-wish="false">♡</button>
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-bottom">
            <span class="price">$${product.price.toFixed(2)}</span>
            <button class="add-cart" type="button" data-index="${index}">Add to bag</button>
          </div>
        </div>
      </article>`;
  }).join("");

  productsContainer.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => addToCart(Number(button.dataset.index)));
  });

  productsContainer.querySelectorAll(".wishlist").forEach(button => {
    button.addEventListener("click", () => {
      const active = button.dataset.wish === "true";
      button.dataset.wish = String(!active);
      button.textContent = active ? "♡" : "♥";
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
        <button class="remove-item" type="button" data-remove="${index}">×</button>
      </div>`;
  }).join("");

  cartTotal.textContent = `$${total.toFixed(2)}`;

  cartItems.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      cart.splice(Number(button.dataset.remove), 1);
      updateCart();
    });
  });
}

function addToCart(index) {
  if (!products[index]) return;
  cart.push(products[index]);
  updateCart();
  cartOverlay?.classList.add("show");
}

// Categories

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.category;
    displayProducts(category === "all" ? products : products.filter(p => p.category === category));
  });
});

// Cart

document.getElementById("cartBtn")?.addEventListener("click", () => cartOverlay?.classList.add("show"));
document.getElementById("closeCart")?.addEventListener("click", () => cartOverlay?.classList.remove("show"));
cartOverlay?.addEventListener("click", e => {
  if (e.target === cartOverlay) cartOverlay.classList.remove("show");
});

// Search

document.getElementById("searchBtn")?.addEventListener("click", () => {
  searchBox?.classList.add("show");
  setTimeout(() => searchInput?.focus(), 100);
});

document.getElementById("closeSearch")?.addEventListener("click", () => {
  searchBox?.classList.remove("show");
  if (searchInput) searchInput.value = "";
  displayProducts(products);
});

searchInput?.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value) || p.category.includes(value)
  );
  displayProducts(filtered);
});

// Mobile menu

document.getElementById("menuBtn")?.addEventListener("click", () => nav?.classList.toggle("show"));
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("show")));

// Start

displayProducts(products);
updateCart();
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();