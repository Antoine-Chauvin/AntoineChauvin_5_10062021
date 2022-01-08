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



let pannier = []
if (localStorage.pannier) {
    pannier = JSON.parse(localStorage.pannier);
}
/* On vit récupérer les infos de notre choix pour le mettre dans le panier */
let validation = document.getElementById('addToCart')
validation.addEventListener('click', async function () {
    
    let colorChosen = document.getElementById('colors')
    let colorPannier = colorChosen.value 
    let numberChosen = document.getElementById('quantity')
    let numberPannier = parseInt (numberChosen.value) /* On transforme notre valeur considéré comme une string en number */
    

/* Vérifictaion du nobre d'objet identique et addition des quantitées */
let verifLigne = false
    for(let lignePannier of pannier){
        
        if(lignePannier.id === name && lignePannier.color === colorPannier){
            
            lignePannier.qty += numberPannier 
            verifLigne = true
            
        }
    }
    if(!verifLigne){
        let article = await fetch("http://localhost:3000/api/products/" + name);
        article = await article.json();
        pannier.push({ id: name, color:colorPannier, qty: numberPannier, price: article.price })
    }
/* On transform et sauvegarde le panier dasn le local storage */
    let pannierAStocker = JSON.stringify(pannier);
    localStorage.pannier = pannierAStocker;
})