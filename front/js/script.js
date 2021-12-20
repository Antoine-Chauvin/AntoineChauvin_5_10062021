/*
  On est sur la page d'accueuil
  On souhaite afficher la liste des produits
  récupérer les infos sur le serveur (Fetch)
  
  Injecter les infos du serveur et mettre dans l'HTML
  - parcourir le tableau reçu et pour chaque el l'afficher aller chercher les élément un par un pour y faire quelque chose dessus 
  - Demander à JS de crée les balises HTMl.
    - Mettre les infos du serveur de chaque élément dans l'html
    - injecter l'html dynamisé dans le DOM 
*/

let produits = []


async function fetchProduits(){
    let response = await fetch("http://localhost:3000/api/products")
    produits = await response.json()    
    for (i = 0 ; i < produits.length ; i++){
        let produit = produits[i] 
               
        
        let carteProduit = document.createElement("a") // créer une balise HTML
        carteProduit.href = "product.html?article="+produit._id
        
        let carteProduitArticle = document.createElement("article")
        
        let carteProduitImg = document.createElement("img")
        carteProduitImg.src = produit.imageUrl
        carteProduitImg.alt = produit.altTxt
        
        let carteProduitTitle = document.createElement("h3")
        carteProduitTitle.innerText = produit.name
        carteProduitTitle.classList.add("productName")
        
        let carteProduitPara = document.createElement("p")
        carteProduitPara.innerText = produit.description      
        carteProduitPara.classList.add('productDesciption')
        
        
        carteProduit.appendChild(carteProduitArticle)
        carteProduitArticle.appendChild(carteProduitImg)
        carteProduitArticle.appendChild(carteProduitTitle)
        carteProduitArticle.appendChild(carteProduitPara)

        document.getElementById("items").appendChild(carteProduit)
        
        
    }
} 
fetchProduits();