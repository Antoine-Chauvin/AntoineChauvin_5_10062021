let basket = JSON.parse(localStorage.getItem("cart"));
// console.log(basket);





const cartContainer = function () {
    const cartItems = document.getElementById("cart__items");
    const cartEmpty = document.getElementById("cartAndFormContainer");
    // ----- Si Le Panier Est Vide ----- //
    if (basket === null || basket === 0) {
        cartEmpty.innerHTML = '<h1>Votre Panier Est Vide</h1>';
        // ----- Affichage Des Produit Dans Le Panier ----- //
    } else {
        for (let product in basket) {
            cartItems.innerHTML += `
        <article class="cart__item" data-id="${basket[product]._id}">  
            <div class="cart__item__img">
                <img src="${basket[product].image}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${basket[product].name}</h2>
                    <p>Prix : ${basket[product].price} €</p>
                    <p class="totalPrice">Prix Total : ${basket[product].price * basket[product].quantity} €</p>
                </div>
                <div class="cart__item">
                  <p>Couleur : ${basket[product].colors}</p>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input id="" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[product].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <button class="deleteItem">Supprimer</button>
                    </div>
                </div>
            </div>
      </article>
        `;
        }
    }
}
cartContainer();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// ##### Supprimer Un Article du Panier ##### //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

const btnDeleteItems = document.querySelectorAll(".deleteItem");
console.log(btnDeleteItems);

for (let i = 0; i < btnDeleteItems.length; i++) {
    btnDeleteItems[i].addEventListener("click", function (e) {
            e.preventDefault();

            //-- Séléction de l'id du produit qui va être supp en cliquant sur le Btn--//
            let idDelet = basket[i]._id;

            //-- Avec la méthode FILTER je sélectionne les éléments à garder et je supprime l'élément ou le Btn supprimer a été cliqué--//
            basket = basket.filter(function (el) {
                return el._id !== idDelet;
            });

            //-- Envoie la variable dans le local Storage --//
            localStorage.setItem("cart", JSON.stringify(basket));

            //-- Alert pour avertit que le produit a bien été supprimé --// 
            alert("Ce produit a été supprimé du panier");

            //-- Recharge de la page --//
            location.reload();

        });
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// ##### Choix De La Quantité Des Produits Dans Le Panier ##### //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

const modifQuantity = document.querySelectorAll(".itemQuantity");

for (let j = 0; j < modifQuantity.length; j++) {
    modifQuantity[j].addEventListener("change", function (e) {
            e.preventDefault();

            let quantityChange = basket[j].quantity;
            let quantityValue = modifQuantity[j].valueAsNumber;

            const result = basket.find(function (el) {
                    return el.quantityValue !== quantityChange;
                });

            result.quantity = quantityValue;
            basket[j].quantity = result.quantity;

            localStorage.setItem("cart", JSON.stringify(basket));

            //-- Recharge de la page --//
            location.reload();
        })
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// ##### Afficher Le Prix Total Et La Quantité Des Produits Dans Le Panier ##### //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

const totalPrice = function () {
    //-- Déclaration d'un tableau qui contiadra les prix qui sont dans le panier --// 
    let totalCart = [];
    //-- Déclaration d'un tableau qui contiadra les quantités qui sont dans le panier --//
    let totalQuantity = [];

    //-- Récupération du prix et des quantités dans le panier --//
    for (let k = 0; k < basket.length; k++) {
        let productPrice = basket[k].price * basket[k].quantity; //Calcul du prix untitaire * la quantité choisi
        let productQuantity = basket[k].quantity;

        //-- Mettre les prix du panier dans la variable "totalCart" --//
        totalCart.push(productPrice);
        //-- Mettre les quantités du panier dans la variable "totalQuantity" --//
        totalQuantity.push(productQuantity);

        //-- Utilisation de la méthode "Reducer" pour pouvoir additionner les prix et les quantités présents dans les tableau des variables "totalCart" & "totalQuantity" --//
        function reducer(accumulator, currentValue) {
            return accumulator + currentValue;
        }
        document.getElementById("totalPrice").textContent =
            totalCart.reduce(reducer, 0);

        document.getElementById("totalQuantity").textContent =
            totalQuantity.reduce(reducer, 0);
    }
}
totalPrice();


//~~~~~~~~~~~~~~~~~~~~~~~~//
// ##### Formulaire ##### //
//~~~~~~~~~~~~~~~~~~~~~~~~//


// -- Récupération Des ID -- //
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const btnOrder = document.getElementById("order");
// -- Récupération Des ID Pour Error Messages -- //
const firstNameErrMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrMsg = document.getElementById("lastNameErrorMsg");
const addressErrMsg = document.getElementById("addressErrorMsg");
const cityErrMsg = document.getElementById("cityErrorMsg");
const emailErrMsg = document.getElementById("emailErrorMsg");

// -- Mis En Place Des RegExp -- //
const formRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
// const addressRegExp = new RegExp("^[0-9]{1,3}+[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
const emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

// -- Fonction Qui Permet L'écoute De La Modification Et De La Validation Du Form -- //

const form = function () {

    // -- Prénom -- //
    firstName.addEventListener("change", function (e) {
        e.preventDefault();
        validFirstName(this);
    });

    const validFirstName = function (inputFirstName) {

        let testFirstName = formRegExp.test(inputFirstName.value);

        if (testFirstName) {
            firstNameErrMsg.innerHTML = '';
        } else {
            firstNameErrMsg.innerHTML = 'Prénom Non Valide';
        }
    };

    // -- Nom -- //
    lastName.addEventListener("change", function (e) {
        e.preventDefault();
        validLastName(this);
    });

    const validLastName = function (inputLastName) {

        let testLastName = formRegExp.test(inputLastName.value);

        if (testLastName) {
            lastNameErrMsg.innerHTML = '';
        } else {
            lastNameErrMsg.innerHTML = 'Nom Non Valide';
        }
    };

    // -- Adresse -- //
    // address.addEventListener("change", function (e) {
    //     e.preventDefault();
    //     validAddress(this);
    // });
    // const validAddress = function (inputAddress) {
    //     let testAddress = addressRegExp.test(inputAddress.value);
    //     if (testAddress) {
    //         addressErrMsg.innerHTML = '';
    //     } else {
    //         addressErrMsg.innerHTML = 'Adresse Non Valide';
    //     }
    // };
    // -- Ville -- //
    // city.addEventListener("change", function (e) {
    //     e.preventDefault();
    //     validCity(this);
    // });
    // const validCity = function (inputCity) {
    //     let testCity = addressRegExp.test(inputCity.value);
    //     if (testCity) {
    //         cityErrMsg.innerHTML = '';
    //     } else {
    //         cityErrMsg.innerHTML = 'Ville Non Valide';
    //     }
    // };
    // -- Email -- //
    email.addEventListener("change", function (e) {
        e.preventDefault();
        validEmail(this);
    });

    const validEmail = function (inputEmail) {

        let testEmail = emailRegExp.test(inputEmail.value);

        if (testEmail) {
            emailErrMsg.innerHTML = '';
        } else {
            emailErrMsg.innerHTML = 'Email Non Valide';
        }
    };
}
form();



function sendForm() {

    btnOrder.addEventListener("click", function (e) {
            e.preventDefault();

            // -- Création d'un contact -- //
            const contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
            };


            const products = [];
            for (let l = 0; l < basket.length; l++) {
                products.push(basket[l]._id);
            }


            fetch('http://localhost:3000/api/products/order', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "contact": contact, "products": products })
            })
                .then(function (res) {
                        return res.json();
                    })
                .then(function (data) {
                        localStorage.setItem("order", JSON.stringify(data.orderId));
                        //localStorage.clear();
                        console.log(data);


                    });
            document.location.href = "confirmation.html";
        });
}
sendForm();




 /* const contact = {firstName: "firstName", lastName: "test", address: "test", city: "test", email: "test@test.fr"};
 const products = ["107fb5b75607497b96722bda5b504926"];

 btnOrder.addEventListener("click",function (e) {
         e.preventDefault();
         fetch('http://localhost:3000/api/products/order', {
             method: 'post',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({ "contact": contact, "products": products })
         })
             .then(function (response) {
                 // console.log(response.json());
                 response.json().then(function (data) {
                         console.log(data);
                     });
             });
     } */