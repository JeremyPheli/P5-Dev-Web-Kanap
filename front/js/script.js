
/* --> Importation et affichage des articles sur la page d'acceuil <-- */


/* Création d'une requête permettant de récupérer les données de l'API grâce à un Fetch (GET) */
fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    /* Récupération de la réponse, et qui va afficher les éléments dans le DOM */
    .then(function (items) {
        console.log(items);

        /* Boucle qui permet d'afficher chaque 'article' du produit */
        for (let article of items) {
            displayProduct(article);
            console.log(article);
        }
    })
    /* Affiche un message d'erreur en cas de promesse rejetée */
    .catch(function (err) {
        console.log("Fetch failed", err);
        let items = document.querySelector("#items");
        items.innerHTML = "Affichage momentanément indisponible. Veuillez réessayer plus tard.";
    });


/* Fonction qui permet d'afficher les informations de chaque produits */
const displayProduct = (article) => {
    /* Paramétrage de l'attribut 'href' de la balise 'a' 
     --- avec ID pour récupération de l'article depuis la page produit --- */
    let productLink = document.createElement("a");
    document.querySelector(".items").appendChild(productLink);
    productLink.href = `product.html?id=${article._id}`;

    let itemArticle = document.createElement("article");
    productLink.appendChild(itemArticle);

    // Affiche image et texte alternatif
    let productImg = document.createElement("img");
    itemArticle.appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Affichage du nom du produit
    let productName = document.createElement("h3");
    itemArticle.appendChild(productName);
    productName.classList.add("productName");
    productName.innerHTML = article.name;

    // Affichage de la description du produit
    let productDescription = document.createElement("p");
    itemArticle.appendChild(productDescription);
    productDescription.classList.add("productDescription");
    productDescription.innerHTML = article.description;
}
