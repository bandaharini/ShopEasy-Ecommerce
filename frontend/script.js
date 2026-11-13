
// ======================================
// SHopeasy - GLOBAL VARIABLES
// ======================================

const API_URL = "http://localhost:8080/api/products";

let products = [];

let cart = JSON.parse(
    localStorage.getItem("shopeasyCart")
) || [];

let selectedCategory = "all";


// ======================================
// SAVE CART
// ======================================

function saveCart() {

    localStorage.setItem(
        "shopeasyCart",
        JSON.stringify(cart)
    );

}


// ======================================
// PRODUCT IMAGES
// ======================================

function getProductImage(name) {

    const images = {
        "laptop": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        "headphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        "keyboard": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
        "mobile phone": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        "smart watch": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        "tablet": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
        "bluetooth speaker": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        "gaming mouse": "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
        "computer monitor": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
        "digital camera": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
        "smart tv": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
        "power bank": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500"
    };

    return images[name.toLowerCase()] ||
        "https://placehold.co/300x200?text=Product";
}


// ======================================
// PRODUCT CATEGORY
// ======================================

function getProductCategory(name) {

    const accessories = [
        "headphones",
        "keyboard",
        "gaming mouse",
        "power bank",
        "wireless earbuds"
    ];

    const homeAppliances = [
        "refrigerator",
        "washing machine"
    ];

    const productName = name.toLowerCase();

    if (accessories.includes(productName)) {
        return "accessories";
    }

    if (homeAppliances.includes(productName)) {
        return "home";
    }

    return "electronics";
}


// ======================================
// LOAD PRODUCTS FROM SPRING BOOT
// ======================================

async function loadProducts() {

    const productList =
        document.getElementById("product-list");

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Backend API error");
        }

        const data = await response.json();

        products = data.map(product => ({
            ...product,
            image: getProductImage(product.name),
            category: getProductCategory(product.name)
        }));

        // Update stock details in previously saved cart
        cart.forEach(item => {

            const product = products.find(
                p => p.id === item.id
            );

            if (product) {
                item.stockQuantity = product.quantity;
                item.image = product.image;
            }

        });

        saveCart();

        displayProducts(products);

        updateCartCount();

    } catch (error) {

        console.error(error);

        if (productList) {
            productList.innerHTML = `
                <p class="error-message">
                    Unable to load products.
                    Please make sure your backend is running.
                </p>
            `;
        }

    }
}


// ======================================
// DISPLAY PRODUCTS
// ======================================

function displayProducts(items) {

    const productList =
        document.getElementById("product-list");

    if (!productList) return;

    productList.innerHTML = "";

    const noProducts =
        document.getElementById("no-products");

    if (noProducts) {
        noProducts.hidden = items.length > 0;
    }

    items.forEach(product => {

        const card = document.createElement("div");

        card.className = "product";

        const image = document.createElement("img");

        image.src = product.image;
        image.alt = product.name;

        image.onerror = function () {
            this.onerror = null;
            this.src =
                "https://placehold.co/300x200?text=Product";
        };

        const name = document.createElement("h3");

        name.textContent = product.name;

        const price = document.createElement("p");

        price.className = "price";

        price.textContent =
            "₹" + Number(product.price).toLocaleString("en-IN");

        const stock = document.createElement("p");

        stock.textContent =
            "Available Stock: " + product.quantity;

        const button = document.createElement("button");

        button.textContent =
            product.quantity > 0 ? "Add to Cart" : "Out of Stock";

        button.disabled = product.quantity <= 0;

        button.addEventListener("click", function () {
            addToCart(product.id);
        });

        card.append(
            image,
            name,
            price,
            stock,
            button
        );

        productList.appendChild(card);

    });

}


// ======================================
// SEARCH AND CATEGORY FILTER
// ======================================

function filterProducts() {

    const searchInput =
        document.getElementById("search");

    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    displayProducts(filteredProducts);

}


// ======================================
// CATEGORY BUTTONS
// ======================================

document.querySelectorAll(".category-btn").forEach(button => {

    button.addEventListener("click", function () {

        selectedCategory = this.dataset.category;

        document.querySelectorAll(".category-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        filterProducts();

    });

});


// ======================================
// SEARCH INPUT
// ======================================

const searchInput = document.getElementById("search");

if (searchInput) {

    searchInput.addEventListener("input", filterProducts);

}


// ======================================
// ADD TO CART
// ======================================

function addToCart(id) {

    const product = products.find(
        item => item.id === id
    );

    if (!product) return;

    const cartItem = cart.find(
        item => item.id === id
    );

    if (cartItem) {

        if (cartItem.quantity >= product.quantity) {

            alert("Sorry, no more stock is available.");

            return;
        }

        cartItem.quantity++;

    } else {

        if (product.quantity <= 0) {

            alert("This product is out of stock.");

            return;
        }

        cart.push({
            ...product,
            quantity: 1,
            stockQuantity: product.quantity
        });

    }

    saveCart();

    updateCartCount();

    alert(product.name + " added to cart!");

}


// ======================================
// UPDATE CART COUNT
// ======================================

function updateCartCount() {

    const count = cart.reduce(
        (sum, item) => sum + Number(item.quantity),
        0
    );

    const cartCount =
        document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = count;
    }

}


// ======================================
// OPEN CART PAGE
// ======================================

function showCart() {

    saveCart();

    window.location.href = "cart.html";

}


// ======================================
// DISPLAY CART PRODUCTS
// ======================================

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-message">
                <h3>Your cart is empty!</h3>
                <p>Please add some products.</p>
            </div>
        `;

        document.getElementById("total").textContent = "0.00";

        return;
    }

    cart.forEach((item, index) => {

        const price = Number(item.price);

        const quantity = Number(item.quantity);

        const subtotal = price * quantity;

        total += subtotal;

        const card = document.createElement("div");

        card.className = "cart-product";

        const image = document.createElement("img");

        image.src = item.image || getProductImage(item.name);

        image.alt = item.name;

        image.onerror = function () {
            this.onerror = null;
            this.src =
                "https://placehold.co/300x200?text=Product";
        };

        const details = document.createElement("div");

        details.className = "cart-details";

        const name = document.createElement("h3");

        name.textContent = item.name;

        const priceText = document.createElement("p");

        priceText.textContent =
            "Price: ₹" + price.toLocaleString("en-IN");

        const quantityText = document.createElement("p");

        quantityText.textContent =
            "Quantity: " + quantity;

        const subtotalText = document.createElement("p");

        subtotalText.textContent =
            "Subtotal: ₹" + subtotal.toLocaleString("en-IN");

        details.append(
            name,
            priceText,
            quantityText,
            subtotalText
        );

        const actions = document.createElement("div");

        actions.className = "cart-actions";

        const minusButton = document.createElement("button");

        minusButton.textContent = "-";

        minusButton.addEventListener("click", () => {
            changeQuantity(index, -1);
        });

        const plusButton = document.createElement("button");

        plusButton.textContent = "+";

        plusButton.addEventListener("click", () => {
            changeQuantity(index, 1);
        });

        const removeButton = document.createElement("button");

        removeButton.textContent = "Remove";

        removeButton.className = "remove-btn";

        removeButton.addEventListener("click", () => {
            removeItem(index);
        });

        actions.append(
            minusButton,
            plusButton,
            removeButton
        );

        card.append(
            image,
            details,
            actions
        );

        cartItems.appendChild(card);

    });

    document.getElementById("total").textContent =
        total.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

}


// ======================================
// CHANGE QUANTITY ON CART PAGE
// ======================================

function changeQuantity(index, amount) {

    const item = cart[index];

    if (!item) return;

    if (amount > 0) {

        const stock = Number(item.stockQuantity);

        if (!stock || item.quantity >= stock) {

            alert("Sorry, no more stock is available.");

            return;
        }

    }

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart.splice(index, 1);

    }

    saveCart();

    displayCart();

    updateCartCount();

}


// ======================================
// REMOVE CART ITEM
// ======================================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();

}


// ======================================
// CHECKOUT
// ======================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price) * Number(item.quantity),
        0
    );

    alert(
        "Your order total is ₹" +
        total.toLocaleString("en-IN") +
        ". Order placement will be added later."
    );

}


// ======================================
// PAGE INITIALIZATION
// ======================================

if (document.getElementById("product-list")) {

    // Main shopping page
    loadProducts();

} else if (document.getElementById("cart-items")) {

    // Separate cart page
    displayCart();

    updateCartCount();

}
