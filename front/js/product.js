var str = location.href;
var url = new URL(str);
var name = url.searchParams.get("article");




async function fetchProduct() {
    let article = await fetch("http://localhost:3000/api/products/" + name);
    article = await article.json();


    let itemImg = document.querySelector('.item__img');
    itemImg.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}"></img>`

    let itemTitle = document.getElementById('title')
    itemTitle.innerText = article.name

    let itemPrice = document.getElementById('price')
    itemPrice.innerText = article.price

    let itemDescription = document.getElementById('description')
    itemDescription.innerText = article.description

    let itemColors = document.getElementById('colors')
    for (i = 0; i < article.colors.length; i++) {
        let color = article.colors[i]

        itemColors.innerHTML += `<option value=${color}>${color}</option>`

    }

}
fetchProduct()

/* Local Storage */

async function addToPannier(pannier, color, qty, id) {
    let verifLigne = false
    for (let lignePannier of pannier) {

        if (lignePannier.id === id && lignePannier.color === color) {

            lignePannier.qty += qty
            verifLigne = true

        }
    }
    if (!verifLigne) {
        let article = await fetch("http://localhost:3000/api/products/" + name);
        article = await article.json();
        pannier.push({ id: id, color: color, qty: qty, price: article.price })
    }

    return pannier
}

function savePannier(pannier) {
    let pannierAStocker = JSON.stringify(pannier);
    localStorage.pannier = pannierAStocker;
    return pannier
}


function loadPannier() {
    let bascket = []
    if (localStorage.pannier) {
        bascket = JSON.parse(localStorage.pannier);
    }
    return bascket
}

function errorQtyColor(qty, color) {
    if (qty < 1 || qty > 100 && color === undifined) {
        alert('champ à modifier')
    }
}

//creation d'un espace pour les messages d'errreur pour l'utilisateur
let errorMsg = document.createElement('span');
let errorMsg2 = document.createElement('span');
let parentsError = document.querySelector('div .item__content__settings__color');
let parentsError2 = document.querySelector('div .item__content__settings__quantity');
parentsError.appendChild(errorMsg);
parentsError2.appendChild(errorMsg2);

//fonction qui affichera un message d'erreur si le nombre d'objets selectionné est <1 ou >100 et que la couleur n'est pas selectionné, 
//attend en paramètre la couleur de l'objet à mettre dans le panier un string et un nombre dans la qty .
function erreur(color, qty) {
    let asError = false
    if (color === '') {
        errorMsg.innerText = 'Champs incomplet ou errorné, verifiez SVP'
        asError = true
    }
    if (qty < 1 || qty > 100) {
        errorMsg2.innerText = 'Champs incomplet ou errorné, verifiez SVP'
        asError = true
    }
    return asError
}

let pannier = loadPannier()

/* On vient récupérer les infos de notre choix pour le mettre dans le panier */
let validation = document.getElementById('addToCart')
validation.addEventListener('click', async function () {

    let colorChosen = document.getElementById('colors')
    let colorPannier = colorChosen.value
    let numberChosen = document.getElementById('quantity')
    let numberPannier = parseInt(numberChosen.value) /* On transforme notre valeur considéré comme une string en number */

    errorMsg.innerText = ''
    errorMsg2.innerText = ''

    //message d'erreur si une ou les deux 
    let errorAs = erreur(colorPannier, numberPannier)

    if (errorAs === true) {
        return
    }

    /* Vérifictaion du nombre d'objet identique et addition des quantitées */
    await addToPannier(pannier, colorPannier, numberPannier, name)

    /* On transform et sauvegarde le panier dans le local storage */
    savePannier(pannier)

})


