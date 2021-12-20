/* Il faut récuppérer les infos de notre local storage
    Parcourir les infos
    Récupéré l'image pour chaque éléments du panier correspondant
    Récupéré les prix
    additionner les prix
     */



async function affichagePannier() {
    let pannier = []
    let totalQuantity = 0
    let totalPrice = 0
    let Total = document.getElementById('totalQuantity')
    let total = document.getElementById('totalPrice')
    if (localStorage.pannier) {
        pannier = JSON.parse(localStorage.pannier);
    }
    for (let i = 0; i < pannier.length; i++) {
        /* Pour chaque boucle on veut récupérer l'id la couleur en fonction de l'id on doit pouvoir 
        récupéré dans la base de donné le nom l'img et le prix*/
        let article = pannier[i]
        let articleData = await fetch("http://localhost:3000/api/products/" + article.id);
        articleData = await articleData.json();
        let tableauPannier = document.getElementById('cart__items')
        
        let tableauPannierArticle = document.createElement('article')
        tableauPannierArticle.classList.add('cart__item');
        tableauPannierArticle.innerHTML = `
                                    <div class="cart__item__img">
                                    <img src="${articleData.imageUrl}" alt="${articleData.altTxt}">
                                    </div>
                                    <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                        <h2>${articleData.name}</h2>
                                        <p>${article.color}</p>
                                        <p>${articleData.price}</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                        <div class="cart__item__content__settings__quantity">
                                        <p>Qté : </p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.qty}">
                                        </div>
                                        <div class="cart__item__content__settings__delete">
                                        <p class="deleteItem">Supprimer</p>
                                        </div>
                                    </div>
                                    </div>
                                    `
        tableauPannier.appendChild(tableauPannierArticle);
        
        /* Totaux qty et dépense */
       totalQuantity += article.qty
       totalPrice += article.qty * articleData.price
       /* modif qty */
        tableauPannierArticle.querySelector('.itemQuantity').addEventListener('click', function(){
            let newQty = parseInt(tableauPannierArticle.querySelector('.itemQuantity').value)
            
            totalPrice += (newQty - article.qty) * articleData.price
            totalQuantity += newQty - article.qty
            article.qty = newQty
            Total.innerHTML = `<span>${totalQuantity}<\span>` 
            total.innerHTML = `<span>${totalPrice}<\span>`
            let pannierAStocker = JSON.stringify(pannier);
            localStorage.pannier = pannierAStocker;
        })
         /* Supp du pannier et modif qty */
       tableauPannierArticle.querySelector('.deleteItem').addEventListener('click', function(){
           pannier.splice(i,1)
           let pannierAStocker= JSON.stringify(pannier);
            localStorage.pannier = pannierAStocker;
            console.log(i)
            tableauPannierArticle.remove()
            totalPrice -= article.qty * articleData.price
            totalQuantity -= article.qty
            Total.innerHTML = `<span>${totalQuantity}<\span>` 
            total.innerHTML = `<span>${totalPrice}<\span>`
       })

    }
 
 Total.innerHTML = `<span>${totalQuantity}<\span>`
 
 total.innerHTML = `<span>${totalPrice}<\span>`
}
affichagePannier()



/* Formulaire */

/* Récuppérer les données saisies par l'utilisateur
Traiter ces données, bien verif les données saisis pas l'utilisateur (regex)
Gestion des messages d'err
Crée un obj contact récapitulant les données utilisateur
 */

/* Récupération des cases du formulaire */

const prenom = document.getElementById('firstName')
const nom = document.getElementById('lastName')
const adresse = document.getElementById('address')
const ville = document.getElementById('city')
const mail  = document.getElementById('email')
const btnCommande  = document.getElementById('order')

let prenomValide = false
let nomValide = false
let adresseValide = false
let villeValide = false
let mailValide =false

const prenomErrMsg = document.getElementById("firstNameErrorMsg");
const nomErrMsg = document.getElementById("lastNameErrorMsg");
const adresseErrMsg = document.getElementById("addressErrorMsg");
const villeErrMsg = document.getElementById("cityErrorMsg");
const emailErrMsg = document.getElementById("emailErrorMsg");


/* Validation des intputs */

const formRegExp = new RegExp("^[a-zA-Z0-9 ,.'-]+$");
const mailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

prenom.addEventListener('change', function(){
    let prenomType = prenom.value.trim()
    if(formRegExp.test(prenomType)){
        prenomErrMsg.innerText = '' 
        prenomValide = true
    }
    else{
        prenomErrMsg.innerText = 'Veuillez rentrer un prénom' 
        prenomValide = false
    }
})

nom.addEventListener('change', function(){
    let nomType = nom.value.trim()
    if(formRegExp.test(nomType)){
        nomErrMsg.innerText = '' 
        nomValide = true
    }
    else{
        nomErrMsg.innerText = 'Veuillez rentrer un nom' 
        nomValide =false
    }
})
adresse.addEventListener('change', function(){
    let adresseType = adresse.value.trim()
    if(formRegExp.test(adresseType)){
        adresseErrMsg.innerText = '' 
        adresseValide = true
    }
    else{
        adresseErrMsg.innerText = 'Veuillez rentrer une adresse valide' 
        adresseValide = false
    }
})
ville.addEventListener('change', function(){
    let villeType = ville.value.trim()
    if(formRegExp.test(villeType)){
        villeErrMsg.innerText = '' 
        villeValide = true
    }
    else{
        villeErrMsg.innerText = 'Veuillez rentrer une ville valide' 
        villeValide = false
    }
})

mail.addEventListener('change', function(){
    let mailType = mail.value.trim()
    if(mailRegExp.test(mailType)){
        emailErrMsg.innerText = '' 
        mailValide = true
    }
    else{
        emailErrMsg.innerText = 'Veuillez rentrer une adresse mail valide' 
        mailValide =false
    }
})

/* Récupéré les valeurs du formulaire dans le serveur*/

let formulaire = document.querySelector('form.cart__order__form')
formulaire.addEventListener('submit', async function(sendingForm){
    sendingForm.preventDefault()
    if(!prenomValide || !nomValide || !adresseValide || !villeValide || !mailValide){
        return
    }
    const data = {}
    data.contact = {}
    data.contact.firstName = prenom.value 
    data.contact.lastName = nom.value
    data.contact.address =   adresse.value
    data.contact.city =  ville.value
    data.contact.email = mail.value
    data.products = []
    let productsPannier = JSON.parse(localStorage.pannier);
    for(i=0; i < productsPannier.length; i++){
        let lignePannier = productsPannier[i]
        data.products.push(lignePannier.id)
    }
    
    let response = await fetch("http://localhost:3000/api/products/order", {
        method : 'POST' ,  
        body : JSON.stringify(data),
        headers : {'Content-Type' : 'application/json'}
    })
    response = await response.json();
    localStorage.setItem("order", JSON.stringify(response.orderId));
    
    let idOrder = []
if (localStorage.order) {
    idOrder = JSON.parse(localStorage.order);
    console.log(idOrder)
}
    
    
    document.location.href="confirmation.html?orderID="+idOrder;  

})
