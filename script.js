const products = [

    {
        name: "Beauty Essential 01",
        category: "makeup",
        price: 24,
        image: "photo_2026-08-24_14-43-02.jpg"
    },

    {
        name: "Beauty Essential 02",
        category: "skincare",
        price: 29,
        image: "photo_2026-08-24_14-43-04.jpg"
    },

    {
        name: "Beauty Essential 03",
        category: "makeup",
        price: 32,
        image: "photo_2026-08-24_14-43-06.jpg"
    },

    {
        name: "Beauty Essential 04",
        category: "skincare",
        price: 27,
        image: "photo_2026-08-24_14-43-07.jpg"
    },

    {
        name: "Beauty Essential 05",
        category: "fragrance",
        price: 45,
        image: "photo_2026-08-24_14-43-08.jpg"
    },

    {
        name: "Beauty Essential 06",
        category: "makeup",
        price: 35,
        image: "photo_2026-08-24_14-43-09.jpg"
    },

    {
        name: "Beauty Essential 07",
        category: "hair",
        price: 22,
        image: "photo_2026-08-24_14-43-10.jpg"
    },

    {
        name: "Beauty Essential 08",
        category: "makeup",
        price: 31,
        image: "photo_2026-08-24_14-43-10 (2).jpg"
    },

    {
        name: "Beauty Essential 09",
        category: "skincare",
        price: 28,
        image: "photo_2026-08-24_14-43-11.jpg"
    },

    {
        name: "Beauty Essential 10",
        category: "makeup",
        price: 26,
        image: "photo_2026-08-24_14-43-11 (2).jpg"
    },

    {
        name: "Beauty Essential 11",
        category: "skincare",
        price: 34,
        image: "photo_2026-08-24_14-43-12.jpg"
    },

    {
        name: "Beauty Essential 12",
        category: "fragrance",
        price: 49,
        image: "photo_2026-08-24_14-43-13.jpg"
    },

    {
        name: "Beauty Essential 13",
        category: "makeup",
        price: 25,
        image: "photo_2026-08-24_14-43-13 (2).jpg"
    },

    {
        name: "Beauty Essential 14",
        category: "skincare",
        price: 39,
        image: "photo_2026-08-24_14-43-14.jpg"
    },

    {
        name: "Beauty Essential 15",
        category: "makeup",
        price: 30,
        image: "photo_2026-08-24_14-43-14 (2).jpg"
    },

    {
        name: "Beauty Essential 16",
        category: "hair",
        price: 23,
        image: "photo_2026-08-24_14-43-15.jpg"
    },

    {
        name: "Beauty Essential 17",
        category: "skincare",
        price: 36,
        image: "photo_2026-08-24_14-43-16.jpg"
    },

    {
        name: "Beauty Essential 18",
        category: "makeup",
        price: 33,
        image: "photo_2026-08-24_14-43-16 (2).jpg"
    },

    {
        name: "Beauty Essential 19",
        category: "fragrance",
        price: 55,
        image: "photo_2026-08-24_14-43-17.jpg"
    },

    {
        name: "Beauty Essential 20",
        category: "makeup",
        price: 29,
        image: "photo_2026-08-24_14-43-18.jpg"
    },

    {
        name: "Beauty Essential 21",
        category: "skincare",
        price: 37,
        image: "photo_2026-08-24_14-43-18 (2).jpg"
    },

    {
        name: "Beauty Essential 22",
        category: "hair",
        price: 21,
        image: "photo_2026-08-24_14-43-19.jpg"
    },

    {
        name: "Beauty Essential 23",
        category: "makeup",
        price: 42,
        image: "photo_2026-08-24_14-43-19 (2).jpg"
    },

    {
        name: "New Beauty Product",
        category: "skincare",
        price: 38,
        image: "photo_2026-08-24_14-49-03.jpg"
    }

];


const productsContainer = document.getElementById("products");
const productCount = document.getElementById("productCount");

let cart = [];


// PRODUCT DISPLAY

function displayProducts(list) {

    productsContainer.innerHTML = "";

    productCount.textContent = list.length;

    list.forEach((product, index) => {

        const card = document.createElement("article");

        card.className = "product";

        card.innerHTML = `
            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <button
                    class="wishlist"
                    onclick="toggleWishlist(this)"
                >
                    ♡
                </button>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="product-bottom">

                    <span class="price">
                        $${product.price.toFixed(2)}
                    </span>

                    <button
                        class="add-cart"
                        onclick="addToCart(${products.indexOf(product)})"
                    >
                        Add to bag
                    </button>

                </div>

            </div>
        `;

        productsContainer.appendChild(card);

    });

}


displayProducts(products);


// CATEGORY FILTER

const categoryButtons = document.querySelectorAll(".category");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        if (category === "all") {
            displayProducts(products);
        } else {
            displayProducts(
                products.filter(product =>
                    product.category === category
                )
            );
        }

    });

});


// CART

function addToCart(index) {

    const product = products[index];

    cart.push(product);

    updateCart();

    openCart();

}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartCount.textContent = cart.length;

    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="empty-cart">Your bag is empty.</p>`;

        cartTotal.textContent = "$0.00";

        return;
    }


    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach((product, index) => {

        total += product.price;

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div>
                <h4>${product.name}</h4>
                <p>
                    $${product.price.toFixed(2)}
                </p>
            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
            >
                ×
            </button>

        `;

        cartItems.appendChild(item);

    });

    cartTotal.textContent =
        "$" + total.toFixed(2);

}


// CART OPEN/CLOSE

const cartOverlay =
    document.getElementById("cartOverlay");

const cartBtn =
    document.getElementById("cartBtn");

const closeCart =
    document.getElementById("closeCart");


function openCart() {

    cartOverlay.classList.add("show");

}


function closeCartPanel() {

    cartOverlay.classList.remove("show");

}


cartBtn.addEventListener(
    "click",
    openCart
);

closeCart.addEventListener(
    "click",
    closeCartPanel
);

cartOverlay.addEventListener(
    "click",
    event => {

        if (event.target === cartOverlay) {
            closeCartPanel();
        }

    }
);


// WISHLIST

function toggleWishlist(button) {

    if (button.textContent.trim() === "♡") {

        button.textContent = "♥";

    } else {

        button.textContent = "♡";

    }

}


// SEARCH

const searchBtn =
    document.getElementById("searchBtn");

const searchBox =
    document.getElementById("searchBox");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");


searchBtn.addEventListener(
    "click",
    () => {

        searchBox.classList.add("show");

        setTimeout(() => {
            searchInput.focus();
        }, 300);

    }
);


closeSearch.addEventListener(
    "click",
    () => {

        searchBox.classList.remove("show");

        searchInput.value = "";

        displayProducts(products);

    }
);


searchInput.addEventListener(
    "input",
    () => {

        const value =
            searchInput.value.toLowerCase().trim();

        const filtered =
            products.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(value) ||
                product.category
                    .toLowerCase()
                    .includes(value)
            );

        displayProducts(filtered);

    }
);


// MOBILE MENU

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");


menuBtn.addEventListener(
    "click",
    () => {

        nav.classList.toggle("show");

    }
);


nav.querySelectorAll("a").forEach(link => {

    link.addEventListener(
        "click",
        () => nav.classList.remove("show")
    );

});


// YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();
