let productsData = [];

// Function to make the API call and store products data
function fetchProducts() {
  fetch("https://servicereminder.el.r.appspot.com/supertailsProductsAssignment")
    .then((response) => response.json())
    .then((data) => {
      productsData = data.products;
      renderProductList(productsData);
    })
    .catch((error) => {
      console.log("Error fetching products:", error);
    });
}

// Function to render product cards
function renderProductCard(product) {
  const productCard = document.createElement("div");
  productCard.className = "product-card";
  productCard.onclick = function () {
    window.location.href = "http://localhost:3001/?productId=" + product.id;
  };

  const wrapper = document.createElement("div");
  wrapper.className = "product-wrapper";
  productCard.appendChild(wrapper);

  const title = document.createElement("div");
  title.className = "product-title";
  title.innerText = product.title;
  wrapper.appendChild(title);

  const image = document.createElement("img");
  image.className = "product-image";
  image.src = product.image.src;
  image.alt = product.image.alt;
  wrapper.appendChild(image);

  // Check if prescription exists
  const hasPrescription = product.tags.includes("Veterinary Diet");

  // Add class to product card if prescription exists
  if (hasPrescription) {
    productCard.classList.add("has-prescription");
  }

  return productCard;
}

// Function to render product list
function renderProductList(products) {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const productCard = renderProductCard(product);
    productContainer.appendChild(productCard);
  });
}

// Function to apply filters
function applyFilters() {
  const nameFilter = document.getElementById("name-filter").value.toLowerCase();
  const tagFilter = document.getElementById("tag-filter").value.toLowerCase();

  const filteredProducts = productsData.filter((product) => {
    const productName = product.title.toLowerCase();
    const productTags = product.tags.toLowerCase();

    return productName.includes(nameFilter) && productTags.includes(tagFilter);
  });

  renderProductList(filteredProducts);
}

// Fetch products and render them on page load
fetchProducts();
