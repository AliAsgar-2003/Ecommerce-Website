document.addEventListener('DOMContentLoaded', () => {
    // Get category from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    // Fetch and display products for the selected category
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const products = data.filter(product => product.category === category);
            displayProducts(products);
        });

    // Function to display products
    function displayProducts(products) {
        const productsGrid = document.getElementById('products-grid');
        productsGrid.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
            `;
            productsGrid.appendChild(productElement);
        });
    }

    // Filter products by price range
    const priceRange = document.getElementById('price-range');
    priceRange.addEventListener('input', (event) => {
        const maxPrice = event.target.value;
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                const filteredProducts = data.filter(product => product.category === category && product.price <= maxPrice);
                displayProducts(filteredProducts);
            });
    });
});
