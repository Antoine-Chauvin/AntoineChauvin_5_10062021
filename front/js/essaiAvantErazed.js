//
//
//async function addToPannier(pannier, color, qty, id) {
//    let verifLigne = false
//    for (let lignePannier of pannier) {
//
//        if (lignePannier.id === id && lignePannier.color === color) {
//
//            lignePannier.qty += qty
//            verifLigne = true
//
//        }
//    }
//    if (!verifLigne) {
//        let article = await fetch("http://localhost:3000/api/products/" + name);
//        article = await article.json();
//        pannier.push({ id: id, color: color, qty: qty, price: article.price })
//    }
//
//    return pannier
//}
//
//function savePannier(pannier) {
//    let pannierAStocker = JSON.stringify(pannier);
//    localStorage.pannier = pannierAStocker;
//    return pannier
//}
//
///* function loadPannier (){
//    let bascket =[]
//    if(localStorage.bascket){
//        pannier = JSON.parse(localStorage.bascket);
//    }
//return bascket
//} */
//
//let pannier = []
//if(localStorage.pannier){
//    pannier = JSON.parse(localStorage.pannier);
//}
//
///* On vient récupérer les infos de notre choix pour le mettre dans le panier */
//let validation = document.getElementById('addToCart')
//validation.addEventListener('click', function () {
//    
//    let colorChosen = document.getElementById('colors')
//    let colorPannier = colorChosen.value
//    let numberChosen = document.getElementById('quantity')
//    let numberPannier = parseInt(numberChosen.value) /* On transforme notre valeur considéré comme une string en number */
//    
//    /* Vérifictaion du nombre d'objet identique et addition des quantitées */
//    addToPannier(pannier, colorPannier, numberPannier, name)
//    
//    /* On transform et sauvegarde le panier dans le local storage */
//    savePannier(pannier)
//    
//})
//    
//
//