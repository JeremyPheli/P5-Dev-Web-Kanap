
//  Importation et affichage des articles sur la page d'acceuil 


// Création d'une requête permettant de récupérer les données de l'API grâce à un Fetch
fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    // Récupération de la réponse, et qui va afficher les éléments dans le DOM 
    .then(function (items) {

        // Boucle qui permet d'afficher chaque article du produit 
        for (let item of items) {
            displayProduct(item);
        }
    })
    // Affiche un message d'erreur en cas de promesse rejetée 
    .catch(function (err) {
        let items = document.querySelector("#items");
        items.innerHTML = "Affichage momentanément indisponible. Veuillez réessayer plus tard.";
    });


// Fonction qui permet d'afficher les informations de chaque produits dans le DOM 
function displayProduct(item) {
    // Insertion de l'élément "a" 
    let productLink = document.createElement("a");
    document.querySelector(".items").appendChild(productLink);
    productLink.href = `product.html?id=${item._id}`;

    // Insertion de l'article
    let itemArticle = document.createElement("article");
    productLink.appendChild(itemArticle);

    // Insertion de l'image 
    let productImg = document.createElement("img");
    itemArticle.appendChild(productImg);
    productImg.src = item.imageUrl;
    productImg.alt = item.altTxt;

    // Insertion du titre h3
    let productName = document.createElement("h3");
    itemArticle.appendChild(productName);
    productName.classList.add("productName");
    productName.innerHTML = item.name;

    // Insertion de la description du produit
    let productDescription = document.createElement("p");
    itemArticle.appendChild(productDescription);
    productDescription.classList.add("productDescription");
    productDescription.innerHTML = item.description;
}
