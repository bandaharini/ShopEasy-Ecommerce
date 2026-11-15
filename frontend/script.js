
const API_URL = "http://localhost:8080/api/products";
const CART_KEY = "shopeasyCart";

let allProducts = [];

// PRODUCT IMAGES
function getProductImage(name) {

    const images = {

        // ELECTRONICS
        "Laptop": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        "Headphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        "Keyboard": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
        "Mobile Phone": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        "Smart Watch": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        "Tablet": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
        "Bluetooth Speaker": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        "Gaming Mouse": "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
        "Computer Monitor": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
        "Digital Camera": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
        "Smart TV": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",

        // HOME APPLIANCES
        "Refrigerator": "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500",
        "Washing Machine": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500",
        "Microwave Oven": "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500",
        "Dishwasher": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500",
        "Water Purifier": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500",
        "Mixer Grinder": "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500",
        "Vacuum Cleaner": "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500",

        // FOOD PRODUCTS
        "Rice": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500",
        "Wheat Flour": "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=500",
        "Cooking Oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500",
        "Tea Powder": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
        "Coffee Powder": "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500",
        "Biscuits": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500",

        // DRESSES AND CLOTHING
        "Saree": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",

        "Anarkali": "https://www.snehalcreation.co.in/backend/uploads/product_images/thumb_8_121772631717-1772631717-DK-1044.jpg",

        "Kurthi": "https://www.cottoncurio.com/cdn/shop/files/IMG_9859.jpg?v=1755275707",

        "Shirt": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500",

        "Jeans": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",

        "Crop Top": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",

        "Short Kurthi": "https://fashiana.in/cdn/shop/files/JBL02845.jpg?v=1716292368",

        "Cotton Saree": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500",

        // THREE NEW PRODUCTS WITH IMAGES
        "Long Kurthi": "https://ethnichic.in/cdn/shop/files/Blue_and_Grey_modern_Watercolor_Photo_Wall_Frame_Instagram_Post_-_2025-08-13T121658.750_1024x.jpg?v=1755077532",

        "Frock": "https://cdn.shopify.com/s/files/1/0696/5945/9842/files/2_b00b5e12-f521-414c-9f89-31fd3372bf6c.jpg?v=1724065255",

        "Palazzo Set": "https://assets2.andaazfashion.com/media/catalog/product/c/h/chinnon-pistachio-green-embroidered-straight-cut-palazzo-suit-lstv130203-1.jpg"
    };

    return images[name] ||
        "https://placehold.co/500x350/eeeeee/222222?text=Product";
}

// IMAGE ERROR HANDLING
function imageError(image) {
    image.onerror = null;
    image.src = "https://placehold.co/500x350/eeeeee/222222?text=Product";
}

// PRODUCT CATEGORY
function getProductCategory(name) {

    const home = [
        "Refrigerator",
        "Washing Machine",
        "Microwave Oven",
        "Dishwasher",
        "Water Purifier",
        "Mixer Grinder",
        "Vacuum Cleaner"
    ];

    const food = [
        "Rice",
        "Wheat Flour",
        "Cooking Oil",
        "Tea Powder",
        "Coffee Powder",
        "Biscuits"
    ];

    const accessories = [
        "Headphones",
        "Keyboard",
        "Gaming Mouse"
    ];

    const dresses = [
        "Saree",
        "Anarkali",
        "Kurthi",
        "Shirt",
        "Jeans",
        "Crop Top",
        "Short Kurthi",
        "Cotton Saree",
        "Long Kurthi",
        "Frock",
        "Palazzo Set"
    ];

    if (home.includes(name)) return "home";
    if (food.includes(name)) return "food";
    if (accessories.includes(name)) return "accessories";
    if (dresses.includes(name)) return "dresses";

    return "electronics";
}

// PRODUCT DESCRIPTION
function getProductDescription(name) {
    return name +
        " is a quality product available at ShopEasy. " +
        "Shop online and enjoy a convenient shopping experience.";
}

// GET CART
function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// SAVE CART
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

// CLEAN OLD DELETED PRODUCTS FROM CART
function cleanOldCartProducts() {

    const validIds = new Set(
        allProducts.map(product => Number(product.id))
    );

    const cart = getCart().filter(item =>
        validIds.has(Number(item.id))
    );

    saveCart(cart);
}

// LOAD PRODUCTS
async function loadProducts() {

    const productList = document.getElementById("product-list");

    if (productList) {
        productList.innerHTML = "<p>Loading products...</p>";
    }

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch products");
        }

        allProducts = await response.json();

        cleanOldCartProducts();

        updateCartCount();
        displayProducts(allProducts);
        loadProductDetails();
        displayCart();
        displayCheckout();

    } catch (error) {

        console.error(error);

        if (productList) {
            productList.innerHTML =
                "<p>Unable to load products. Please start your backend.</p>";
        }
    }
}

// DISPLAY PRODUCTS
function displayProducts(products) {

    const productList = document.getElementById("product-list");
    const noProducts = document.getElementById("no-products");

    if (!productList) return;

    productList.innerHTML = "";

    if (products.length === 0) {

        if (noProducts) {
            noProducts.style.display = "block";
        }

        return;
    }

    if (noProducts) {
        noProducts.style.display = "none";
    }

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img
                src="${getProductImage(product.name)}"
                alt="${product.name}"
                onerror="imageError(this)"
                onclick="openProduct(${product.id})"
            >

            <h3>${product.name}</h3>

            <p>Price: ₹${product.price}</p>

            <p>Available: ${product.quantity}</p>

            <button onclick="openProduct(${product.id})">
                View Details
            </button>
        `;

        productList.appendChild(card);
    });
}

// SEARCH PRODUCTS
function searchProducts() {

    const searchInput = document.getElementById("search");

    if (!searchInput) return;

    const value = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
}

// FILTER PRODUCTS
function filterProducts(category) {

    if (category === "all") {
        displayProducts(allProducts);
        return;
    }

    const filtered = allProducts.filter(product =>
        getProductCategory(product.name) === category
    );

    displayProducts(filtered);
}

// OPEN PRODUCT DETAILS
function openProduct(id) {
    window.location.href = "product.html?id=" + id;
}

// LOAD PRODUCT DETAILS
function loadProductDetails() {

    const details = document.getElementById("product-details");

    if (!details) return;

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    const product = allProducts.find(item =>
        Number(item.id) === id
    );

    if (!product) {
        details.innerHTML = "<h2>Product not found</h2>";
        return;
    }

    details.innerHTML = `
        <img
            src="${getProductImage(product.name)}"
            alt="${product.name}"
            onerror="imageError(this)"
        >

        <div class="product-info">

            <h1>${product.name}</h1>

            <h2>Price: ₹${product.price}</h2>

            <p>${getProductDescription(product.name)}</p>

            <p>Available Stock: ${product.quantity}</p>

            <label>Quantity:</label>

            <input
                type="number"
                id="product-quantity"
                value="1"
                min="1"
                max="${product.quantity}"
            >

            <br>

            <button onclick="addProductToCart(${product.id})">
                Add to Cart
            </button>

            <button onclick="buyNow(${product.id})">
                Buy Now
            </button>

        </div>
    `;
}

// ADD TO CART
function addProductToCart(id, quantity = null) {

    const product = allProducts.find(item =>
        Number(item.id) === Number(id)
    );

    if (!product) {
        alert("Product not found.");
        return false;
    }

    const input = document.getElementById("product-quantity");

    const selectedQuantity =
        quantity === null ? Number(input ? input.value : 1) : quantity;

    if (!Number.isInteger(selectedQuantity) || selectedQuantity < 1) {
        alert("Please enter a valid quantity.");
        return false;
    }

    if (selectedQuantity > product.quantity) {
        alert("Only " + product.quantity + " items are available.");
        return false;
    }

    const cart = getCart();

    const existing = cart.find(item =>
        Number(item.id) === Number(id)
    );

    if (existing) {

        if (existing.quantity + selectedQuantity > product.quantity) {
            alert("You cannot add more than available stock.");
            return false;
        }

        existing.quantity += selectedQuantity;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: selectedQuantity,
            stockQuantity: product.quantity,
            image: getProductImage(product.name)
        });
    }

    saveCart(cart);

    alert("Product added to cart successfully!");

    return true;
}

// BUY NOW
function buyNow(id) {

    const input = document.getElementById("product-quantity");

    const quantity = input ? Number(input.value) : 1;

    if (addProductToCart(id, quantity)) {
        window.location.href = "checkout.html";
    }
}

// UPDATE CART COUNT
function updateCartCount() {

    const countElement = document.getElementById("cart-count");

    if (!countElement) return;

    const total = getCart().reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    countElement.textContent = total;
}

// DISPLAY CART WITH IMAGES
function displayCart() {

    const cartItems = document.getElementById("cart-items");

    if (!cartItems) return;

    const cart = getCart();

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div class="cart-product-info">

                <img
                    src="${getProductImage(item.name)}"
                    alt="${item.name}"
                    class="cart-product-image"
                    onerror="imageError(this)"
                >

                <div>
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p>
                    <p>Subtotal: ₹${subtotal}</p>
                </div>

            </div>

            <div>

                <input
                    type="number"
                    value="${item.quantity}"
                    min="1"
                    max="${item.stockQuantity}"
                    onchange="updateCartQuantity(${item.id}, this.value)"
                >

                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>

            </div>
        `;

        cartItems.appendChild(div);
    });

    const totalElement = document.getElementById("total");

    if (totalElement) {
        totalElement.textContent = total;
    }
}

// UPDATE CART QUANTITY
function updateCartQuantity(id, value) {

    const quantity = Number(value);

    const cart = getCart();

    const item = cart.find(product =>
        Number(product.id) === Number(id)
    );

    if (!item) return;

    if (!Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > item.stockQuantity) {

        alert("Please enter a valid quantity.");

        displayCart();

        return;
    }

    item.quantity = quantity;

    saveCart(cart);

    displayCart();
}

// REMOVE PRODUCT
function removeFromCart(id) {

    const cart = getCart().filter(item =>
        Number(item.id) !== Number(id)
    );

    saveCart(cart);

    displayCart();
}

// CHECKOUT BUTTON
function checkout() {

    if (getCart().length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.location.href = "checkout.html";
}

// CHECKOUT SUMMARY
function displayCheckout() {

    const checkoutItems = document.getElementById("checkout-items");

    if (!checkoutItems) return;

    const cart = getCart();

    checkoutItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        const p = document.createElement("p");

        p.textContent =
            `${item.name} x ${item.quantity} = ₹${subtotal}`;

        checkoutItems.appendChild(p);
    });

    const totalElement = document.getElementById("checkout-total");

    if (totalElement) {
        totalElement.textContent = total;
    }
}

// CHECKOUT VALIDATION
function setupCheckout() {

    const form = document.getElementById("checkout-form");

    if (!form) return;

    const nameInput = document.getElementById("customer-name");
    const phoneInput = document.getElementById("customer-phone");
    const nameError = document.getElementById("name-error");
    const phoneError = document.getElementById("phone-error");

    nameInput.addEventListener("input", function () {

        const name = this.value.trim();

        if (name === "") {
            nameError.textContent = "";
        }

        else if (!/^[A-Za-z][A-Za-z\s'-]*$/.test(name)) {
            nameError.textContent =
                "Name must contain letters only. Numbers are not allowed.";
        }

        else {
            nameError.textContent = "";
        }
    });

    phoneInput.addEventListener("input", function () {

        this.value = this.value.replace(/\D/g, "").slice(0, 10);

        if (this.value === "") {
            phoneError.textContent = "";
        }

        else if (!/^[6-9]\d{9}$/.test(this.value)) {
            phoneError.textContent =
                "Enter a valid 10-digit Indian mobile number.";
        }

        else {
            phoneError.textContent = "";
        }
    });

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        const address =
            document.getElementById("customer-address").value.trim();

        const payment =
            document.getElementById("payment-method").value;

        if (!/^[A-Za-z][A-Za-z\s'-]*$/.test(name)) {
            nameError.textContent = "Please enter a valid name.";
            nameInput.focus();
            return;
        }

        if (!/^[6-9]\d{9}$/.test(phone)) {
            phoneError.textContent = "Enter a valid mobile number.";
            phoneInput.focus();
            return;
        }

        if (address.length < 5) {
            alert("Please enter your complete delivery address.");
            return;
        }

        if (!payment) {
            alert("Please select a payment method.");
            return;
        }

        const cart = getCart();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            window.location.href = "index.html";
            return;
        }

        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const order = {
            orderId: "SE" + Date.now(),
            name: name,
            phone: phone,
            address: address,
            payment: payment,
            total: total,
            items: cart,
            date: new Date().toLocaleString()
        };

        sessionStorage.setItem(
            "shopeasyLastOrder",
            JSON.stringify(order)
        );

        saveCart([]);

        window.location.href = "order-success.html";
    });
}

// ORDER SUCCESS PAGE
function displayOrderSuccess() {

    const successDetails = document.getElementById("success-details");

    if (!successDetails) return;

    const order = JSON.parse(
        sessionStorage.getItem("shopeasyLastOrder")
    );

    if (!order) {
        successDetails.innerHTML =
            "<p>No order details found.</p>";
        return;
    }

    successDetails.innerHTML = `
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>Name:</strong> ${order.name}</p>
        <p><strong>Mobile:</strong> ${order.phone}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Payment:</strong> ${order.payment}</p>
        <p><strong>Total Amount:</strong> ₹${order.total}</p>
        <p><strong>Order Date:</strong> ${order.date}</p>
    `;
}

// PAGE INITIALIZATION
document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();

    loadProducts();

    setupCheckout();

    displayOrderSuccess();

});
