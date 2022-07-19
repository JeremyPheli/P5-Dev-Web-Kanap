
/* On récupère l'ID avec les paramètres de l'URL */
const idItems = new URL(window.location.href).searchParams.get("id");
console.log(idItems);

/* On contacte l'API pour récupérer un article via son ID */
fetch("http://localhost:3000/api/products/" + idItems)
    .then(function (res) {
        return res.json();
    })

    /* Fonction de récupération des informations de l'article */
    .then(function (article) {
        displayProduct(article);
    })

    /* Fonction d'affichage d'erreur */
    .catch((error) => {
        console.log(error, "Fetch failed");

    });

/* Création de la fonction permettant l'affichage des données de l'article */
const displayProduct = (article) => {

    /* Affichage de l'image de l'article choisi */
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    /* Affichage du nom de l'article */
    let productName = document.getElementById("title");
    productName.innerHTML = article.name;

    /* Affichage du prix de l'article */
    let productPrice = document.getElementById("price");
    productPrice.innerHTML = article.price;

    /* Affichage de la description de l'article */
    let productDescription = document.getElementById("description");
    productDescription.innerHTML = article.description;

    /* Choix de la couleur de l'article */
    for (let colors of article.colors) {
        console.log(colors);
        let productsColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productsColors);
        productsColors.value = colors;
        productsColors.innerHTML = colors;
    }

};

/* Gestion du panier */



