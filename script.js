const apiUrl = 'https://s3.us-east-1.amazonaws.com/assets.spotandtango/products.json';
let cart = [];
let products = [];

// Load cart data from localStorage when the page loads
window.onload = function() {
    loadCart();
    fetchProducts();
};

// Fetch product data from the API
function fetchProducts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            products = data; // Store the fetched products
            createCategoryFilter(data); // Create filter before displaying products
            displayProducts(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to create category filter
function createCategoryFilter(products) {
    const headerContainer = document.createElement('div');
    headerContainer.className = 'header-container';
    const select = document.createElement('select');
    select.innerHTML = `<option value="">All Categories</option>`;
    const categories = [...new Set(products.map(product => product.group))]; // Get unique categories
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });
    select.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;
        const filteredProducts = selectedCategory ? products.filter(product => product.group === selectedCategory) : products;
        displayProducts(filteredProducts);
    });

    // Create filter container and append to header
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.appendChild(select);
    headerContainer.appendChild(filterContainer);
    
    // Add the heading to header container
    const header = document.createElement('h1');
    header.textContent = "Spot & Tango | Refurbished Computer Store WebApp!";
    headerContainer.prepend(header);
    
    // Prepend the header container to body
    document.body.prepend(headerContainer);
}

// Function to display products on the page
function displayProducts(products) {
    const productContainer = document.createElement('div');
    productContainer.className = 'product-container';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h2>${product.name}</h2>
            <p>Category: ${product.group}</p>
            <p>MSRP: $${product.msrp.toFixed(2)}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Status: ${product.status}</p>
            <input type="number" value="1" min="1" id="qty-${product.id}" style="width: 50px;"/>
            <button ${product.status === 'Unavailable' ? 'disabled' : ''} onclick="addToCart('${product.id}', '${product.name}', ${product.price})">
                ${product.status === 'Unavailable' ? 'Sold Out' : 'Add to Cart'}
            </button>
        `;
        productContainer.appendChild(productCard);
    });

    // Clear previous product listings and append new ones
    const existingContainer = document.querySelector('.product-container');
    if (existingContainer) {
        existingContainer.remove();
    }
    document.body.appendChild(productContainer);
}

// Function to add products to the cart
function addToCart(productId, productName, productPrice) {
    const qty = document.getElementById(`qty-${productId}`).value;
    const item = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: parseInt(qty)
    };
    cart.push(item);
    saveCart(); // Save cart after adding
    updateCartSummary();
    // Alert message when an item is added
    //alert(`${item.name} has been added to the cart!`);
}

// Function to update and display the cart summary
function updateCartSummary() {
    let cartSummary = document.getElementById('cart-summary');
    
    // Create cart summary if it doesn't exist
    if (!cartSummary) {
        cartSummary = document.createElement('div');
        cartSummary.id = 'cart-summary';
        document.body.appendChild(cartSummary); // Append it to the body
    }
    cartSummary.innerHTML = `<h2>Cart Summary</h2>`;
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartSummary.innerHTML += `
            <p>${item.name}: 
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" style="width: 50px;"/>
            Total: $${(item.price * item.quantity).toFixed(2)} 
            <button onclick="removeFromCart(${index})">Remove</button></p>`;
    });    
    // Add a button to clear the cart
    cartSummary.innerHTML += `<button onclick="emptyCart()">Empty Cart</button>`;
    cartSummary.innerHTML += `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// Function to update the quantity of items in cart
function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    saveCart(); // Save cart after updating
    updateCartSummary();
}

// Function to remove items from cart
function removeFromCart(index) {
    const itemName = cart[index].name; // Get name of the item to display in alert
    cart.splice(index, 1);
    saveCart(); // Save cart after removing
    updateCartSummary();
    // Alert message when an item is removed
    alert(` Removing ${itemName} from the cart!`);
}

// Function to empty the cart
function emptyCart() {
    cart = []; // Clear the cart array
    saveCart(); // Save the empty cart to localStorage
    updateCartSummary(); // Update the cart summary display
}

// Save cart data to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart data from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartSummary();
    }
}
