 // ----- Récupération de l'Id pour chaque élément ----- //
 const urlSearchParams = new URLSearchParams(window.location.search);
 const Id = urlSearchParams.get('id');


 // ----- Ajout de l'Id pour chaque élément dans l'url ----- //
 const url = 'http://localhost:3000/api/products/' + Id;

 //---------------------------------------------------------------------------------//

 // const productName = urlSearchParams.get("name");
 // console.log(productName);
 // document.title = name;

 //----- Sélection des Id dans le HTML -----//
 const Img = document.querySelector('.item__img');
 const Title = document.getElementById('title');
 const Price = document.getElementById('price');
 const Description = document.getElementById('description');
 const Quantity = document.getElementById('quantity');
 const Colors = document.getElementById('colors');
 //---------------------------------------------------------------------------------//

 // ----- Récupération des éléments de l'API -----//
 async function fetchProduct() {
  product = await fetch(url)
    .then(function (res) {
        return res.json();
      })
    .then(function (data) {
        return (productsData = data);
      });
  console.log(productsData);

  // ----- Ajout des éléments de l'API via le DOM -----//'
  document.title = productsData.name;
  Img.innerHTML = `<img src="${productsData.imageUrl}" alt="${productsData.altTxt}"></img>`;
  Title.innerHTML = productsData.name;
  Price.innerHTML = productsData.price;
  Description.innerHTML = productsData.description;
  for (let colors of productsData.colors) {
    Colors.innerHTML += `<option value="${colors}">${colors}</option>`;
  }
}
 // ----- Déclaration de la Fonction "fectProduct" ----- //
 fetchProduct();

 //---------------------------------------------------------------------------------//

 //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
 // ##### AJOUTER AU PANIER #####//
 //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

 // ----- Séléction du Bouton via son Id ----- //
 const btn_addToCart = document.getElementById("addToCart");

 //----- Ecouter le bouton et l'envoyer au panier -----// 
 btn_addToCart.addEventListener("click", function (e) {
     e.preventDefault();

     //----- Choix de la Couleur et de la Quantité ----- //
     const colorItem = colors.value;
     const quantityItem = Quantity.value;

     // ----- Récupération des options à ajouter au panier ----- //
     const productList = {
       altTxt: productsData.altTxt,
       colors: colorItem,
       image: productsData.imageUrl,
       name: productsData.name,
       price: productsData.price,
       quantity: Number(quantityItem),
       _id: Id,
     };
     console.log(productList);

     //----- PopUp de confirmation ----- // 
     function addPopUp() {
     if (window.confirm(`${productsData.name} 
color: ${colors.value} 
A bien été ajouté au panier
Consultez le panier OK ou revenir à l'accueil ANNULER`)) {
       window.location.href = "cart.html";
     } else {
       window.location.href = "index.html";
     }
   }

     //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
     // ##### LE LOCAL STORAGE ##### //
     //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
     // ----- Variable "panier" dans laquelle on met les key et les values qui sont dans le localStorage ----- // 
     let basket = JSON.parse(localStorage.getItem("cart"));
     console.log(basket);
     // ----- JSON.parse converti les données en format json qui sont dans le local storage en objet JS ----- //
     // ----- Fonction ajouter un produit dans le localStorage ----- // 
     function addProductLocalStorage() {
     let productExist = false;
     basket.forEach(function (product) {
         console.log(product._id);
         console.log(productList._id);

         if (product._id === productList._id) {
           product.quantity = product.quantity + 1;
           // produit.quantity++;
           productExist = true;
         }
       });
     if (productExist === false) {
       basket.push(productList);
     }
     localStorage.setItem("cart", JSON.stringify(basket));
   }
     // ----- Si la couleur et le nombre ne sont pas séléctioné une Alert s'affiche à l'écran ----- //
     if (quantityItem < 1 || quantityItem > 100 && colorItem === undefined) {
       alert("Remplir Les Champs");
     } else {


       // ----- S'il y a deja des produits enregistré dans le localStorage ----- //
       if (basket) {
         addProductLocalStorage();
         addPopUp();
       }

       // ----- S'il n'y a pas de produit enregistré dans le localStorage ----- //
       else {
         basket = [];
         addProductLocalStorage();
         addPopUp();
       }
     }

   });