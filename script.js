// Function to decrease the quantity
function quantityDecrease(productId) {
  const quantityInput = document.getElementById(`quantity-${productId}`);
  let quantity = parseInt(quantityInput.value);
  if (quantity > 0) {
    quantity--;
  }
  quantityInput.value = quantity;
}

// Function to increase the quantity
function quantityIncrease(productId) {
  const quantityInput = document.getElementById(`quantity-${productId}`);
  let quantity = parseInt(quantityInput.value);
  quantity++;
  quantityInput.value = quantity;
}
function getProductDetails(productId) {
  let product = null;
  switch (productId) {
    case 1:
      product = {
        image: "images/batshirt.jpeg",
        title: "Batman T-Shirt",
        price: "120.00",
      };
      break;
    case 2:
      product = {
        image: "images/bathood.jpg",
        title: "Batman Hoodie",
        price: "480.00",
      };
      break;
    case 3:
      product = {
        image: "images/batcap.jpg",
        title: "Batman Cap",
        price: "95.50",
      };
      break;
    case 4:
      product = {
        image: "images/battoy.jpg",
        title: "Batman Action Figure",
        price: "350.00",
      };
      break;
    case 5:
      product = {
        image: "images/batpack.jpg",
        title: "Batman Backpack",
        price: "645.00",
      };
      break;
    default:
      break;
  }
  return product;
}
// Function to add an item to the cart
function addToCart(productId) {
  const quantityInput = document.getElementById(`quantity-${productId}`);
  const quantity = parseInt(quantityInput.value);

  if (quantity > 0) {
    // Retrieve existing cart items from localStorage or initialize an empty array
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item in the cart
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Retrieve the product details based on productId
      const product = getProductDetails(productId);

      if (product) {
        // Create a new item with product details and add it to the cart
        const newItem = {
          productId: productId,
          quantity: quantity,
          image: product.image,
          title: product.title,
          price: product.price,
        };
        cartItems.push(newItem);
      }
    }

    // Save the updated cart items to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Update the cart button
    const cartButton = document.getElementById("cart-button");
    const cartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    cartButton.innerText = `Cart (${cartCount})`;

    // Display success message
    const successMessage = document.getElementById(
      `success-message-${productId}`
    );
    successMessage.innerText = `Added ${quantity} item(s) to the cart.`;
    successMessage.classList.add("text-success");

    // Reset quantity input
    quantityInput.value = "0";
  }
}

// Function to remove an item from the cart
function removeFromCart(productId) {
  // Retrieve the cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Filter out the item to be removed
  const updatedCartItems = cartItems.filter(
    (item) => item.productId !== productId
  );

  // Save the updated cart items to localStorage
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

  // Update the cart button
  const cartButton = document.getElementById("cart-button");
  const cartCount = updatedCartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  cartButton.innerText = `Cart (${cartCount})`;

  // Display success message
  const successMessage = document.getElementById(
    `success-message-${productId}`
  );
  successMessage.innerText = `Removed item from the cart.`;
  successMessage.classList.add("text-success");

  // Remove the item from the cart display
  const cartItem = document.getElementById(`cart-item-${productId}`);
  if (cartItem) {
    cartItem.remove();
  }

  // Update the total amount
  displayTotalAmount();

  // Check if the cart is empty
  if (updatedCartItems.length === 0) {
    document.getElementById("cart-content").innerHTML =
      "<p>Your cart is empty.</p>";
  }
}

// Function to retrieve and display the cart items
function displayCartItems() {
  // Retrieve the cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length > 0) {
    // Display the cart items
    let cartContent = "<h2>Cart Items</h2>";
    let totalPrice = 0;
    cartItems.forEach((item) => {
      const itemPrice = parseFloat(item.price) * item.quantity;
      totalPrice += itemPrice;
      cartContent += `
              <div class="cart-item">
                  <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                  <div class="cart-item-details">
                      <h3>${item.title}</h3>
                      <p>Price: R${item.price}</p>
                      <div class="cart-item-actions">
                          <div class="input-group">
                              <button class="btn btn-secondary" type="button" onclick="quantityDecrease(${item.productId})">-</button>
                              <input type="text" class="form-control" value="${item.quantity}" id="quantity-${item.productId}">
                              <button class="btn btn-secondary" type="button" onclick="quantityIncrease(${item.productId})">+</button>
                          </div>
                          <button class="btn btn-danger" onclick="removeFromCart(${item.productId})">Remove</button>
                      </div>
                  </div>
              </div>
          `;
    });
    cartContent += `<h3>Total Amount: R${totalPrice.toFixed(2)}</h3>`;
    document.getElementById("cart-content").innerHTML = cartContent;
  } else {
    // Display a message when the cart is empty
    document.getElementById("cart-content").innerHTML = "Your cart is empty.";
  }
}

// Call the function when the cart page loads
window.onload = function () {
  displayCartItems();
};
