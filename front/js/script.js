let productsData = [];
const product = document.getElementById('items');


async function fetchProducts() {
    await fetch("http://localhost:3000/api/products")
        .then(function (res) {
                return res.json();
            })
        .then(function (data) {
                return (productsData = data);
            });

    console.log(productsData);
}

async function productsDetails() {
    await fetchProducts();
    product.innerHTML = (
        productsData.map(function (kanap) {
                return (
                    `<a href="./product.html?id=${kanap._id}">
             <article>
               <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
               <h3 class="productName">${kanap.name}</h3>
               <p class="productDescription">${kanap.description}</p>
             </article>
          </a>`
                );
            }).join('')
    );
}

productsDetails();
