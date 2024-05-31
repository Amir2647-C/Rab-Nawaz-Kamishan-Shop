document.addEventListener('DOMContentLoaded', () => {
    // Load cart items from local storage
    loadCart();

    // Add event listeners for Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Add event listener for Checkout button
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    }
});

function addToCart(event) {
    const button = event.target;
    const productCard = button.closest('.card');
    const productTitle = productCard.querySelector('.card-title').textContent;
    const productPrice = productCard.querySelector('.text-muted').textContent;
    const productImage = productCard.querySelector('.card-img-top').src;

    const product = {
        title: productTitle,
        price: productPrice,
        image: productImage
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${productTitle} has been added to your cart!`);
}

function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item', 'mb-3');
        cartItem.innerHTML = `
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${item.image}" class="card-img" alt="${item.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.price}</p>
                            <button class="btn btn-sm btn-outline-danger remove-from-cart">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });

    updateCartTotal();
}

function removeFromCart(event) {
    const button = event.target;
    const cartItem = button.closest('.cart-item');
    const productTitle = cartItem.querySelector('.card-title').textContent;

    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.title !== productTitle);
    localStorage.setItem('cart', JSON.stringify(cart));

    cartItem.remove();
    updateCartTotal();
}

function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    cart.forEach(item => {
        total += parseFloat(item.price.replace('$', ''));
    });
    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

function checkout() {
    if (confirm('Are you sure you want to proceed with the checkout?')) {
        localStorage.removeItem('cart');
        alert('Thank you for your purchase!');
        window.location.reload();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    const successMessage = document.getElementById('success-message');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission behavior

            // Process form data here (you can send it to a server using AJAX, for example)

            // Show success message
            successMessage.style.display = 'block';

            // Optionally, clear the form fields after submission
            this.reset();
        });
    }
});
$(document).ready(function(){
    // Add to cart button click event handler
    $('.add-to-cart').click(function(){
        var size = $(this).data('size'); // Get the size from the data attribute
        var productName = $(this).closest('.card').find('.card-title').text().trim(); // Get the product name
        var productPrice = $(this).closest('.card').find('.text-muted').text().trim(); // Get the product price

        // Add the product to the cart (You need to implement this part)
        addToCart(productName, productPrice, size);
    });

    // Add to cart button click event handler for the main product
    $('#add-to-cart-btn').click(function(){
        var size = $('#size').val(); // Get the selected size
        var productName = $('h2').text().trim(); // Get the product name
        var productPrice = $('.text-muted').text().trim(); // Get the product price

        // Add the product to the cart (You need to implement this part)
        addToCart(productName, productPrice, size);
    });

    // Function to add product to the cart
    function addToCart(productName, productPrice, size) {
        // You can add the product to the cart using AJAX request or other method
        // For demonstration, let's just log the selected product details to the console
        console.log("Product Name:", productName);
        console.log("Product Price:", productPrice);
        console.log("Size:", size);
    }
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    // Get form data
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // You can perform form validation here
    console.log('Signup:', { username, email, password });
    // After successful signup, you can redirect the user to the homepage or any other page
    // For demo purposes, redirecting to index.html
    window.location.href = 'index.html';
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    // Get form data
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    // You can perform form validation here

    console.log('Login:', { email, password });
    // After successful login, you can redirect the user to the homepage or any other page
    window.location.href = 'index.html';
});
