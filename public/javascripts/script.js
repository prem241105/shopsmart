// Search Function
function searchProduct() {
  const query = document.getElementById("searchBar").value;
  if (query.trim() === "") {
    alert("Please enter a product name!");
  } else {
    alert("Searching for: " + query);
  }
}

// Login Function
function loginUser(event) {
  event.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    document.getElementById("loginMessage").innerText = "✅ Login successful!";
    document.getElementById("loginMessage").style.color = "green";
  } else {
    document.getElementById("loginMessage").innerText = "❌ Invalid credentials!";
    document.getElementById("loginMessage").style.color = "red";
  }
}

let products = [];

// Load Products
window.onload = function() {
  if (document.getElementById('product-grid')) {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        products = data;
        displayProducts(products);
      });
  }
};

function displayProducts(productsToDisplay) {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = '';
  productsToDisplay.forEach(product => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    let pricesHtml = '';
    product.prices.forEach(priceInfo => {
      pricesHtml += `<p>${priceInfo.store}: $${priceInfo.price}</p>`;
    });
    productItem.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width:100%;height:auto;border-radius:10px;"><h3>${product.name}</h3>${pricesHtml}`;
    productGrid.appendChild(productItem);
  });
}

function sortProducts() {
  const sortedProducts = [...products].sort((a, b) => {
    const aMinPrice = Math.min(...a.prices.map(p => p.price));
    const bMinPrice = Math.min(...b.prices.map(p => p.price));
    return aMinPrice - bMinPrice;
  });
  displayProducts(sortedProducts);
}
