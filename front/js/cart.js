
// Récupération des produits du local storage 
let productsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

// Fonction qui permet de vérifier si il y a des produits à afficher 
async function getCart() {

    // Récupération de la section contenant les produits 
    const positionEmptyCart = document.getElementById("cart__items");

    // Si le local storage est vide 
    if (productsInLocalStorage === null || productsInLocalStorage === 0) {
        let emptyCart = document.createElement("p");
        emptyCart.innerHTML = "Votre panier est vide";
        positionEmptyCart.appendChild(emptyCart);

    } else {
        for (product in productsInLocalStorage) {
            const items = await getProductDetails(productsInLocalStorage[product].id);

            // Insertion de l'article 
            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute("data-id", productsInLocalStorage[product].id);
            productArticle.setAttribute("data-color", productsInLocalStorage[product].color);

            // Insertion de l'élélement "div" 
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";

            // Insertion de l'image 
            let productImg = document.createElement("img");
            productImg.src = items.imageUrl;
            productImg.alt = items.altTxt;
            productDivImg.appendChild(productImg);

            // Insertion de l'élélement "div" 
            let productItemContent = document.createElement("div");
            productItemContent.className = "cart__item__content";
            productArticle.appendChild(productItemContent);

            // Insertion de l'élément "div" description 
            let productItemContentDescription = document.createElement("div");
            productItemContentDescription.className = "cart__item__content__description";
            productItemContent.appendChild(productItemContentDescription);

            // Insertion du titre H2 
            let productTitle = document.createElement("h2");
            productTitle.innerHTML = items.name;
            productItemContentDescription.appendChild(productTitle);

            // Insertion de la couleur 
            let productColor = document.createElement("p");
            productColor.innerHTML = productsInLocalStorage[product].color;
            productItemContentDescription.appendChild(productColor);

            // Insertion du prix 
            let productPrice = document.createElement("p")
            // Création d'une variable permettant de calculer le prix total du produit 
            const totalPriceItem = items.price * productsInLocalStorage[product].quantity;
            productPrice.innerHTML = totalPriceItem + "€";
            productItemContentDescription.appendChild(productPrice);


            // Insertion de l'élément "div" 
            let productItemContentSettings = document.createElement("div");
            productItemContentSettings.className = "cart__item__content__settings";
            productItemContent.appendChild(productItemContentSettings);

            // Insertion de l'élément "div" 
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);

            // Insertion de l'élément "p" 
            let productQte = document.createElement("p");
            productQte.innerHTML = "Qté : ";
            productItemContentSettingsQuantity.appendChild(productQte);

            // Insertion de la quantité 
            let productQuantity = document.createElement("input");
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");
            productQuantity.setAttribute("value", productsInLocalStorage[product].quantity);
            productItemContentSettingsQuantity.appendChild(productQuantity);

            // Insertion de l'élement "div" 
            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
            productItemContentSettings.appendChild(productItemContentSettingsDelete);

            // Insertion de l'élément "p" supprimer 
            let productDelete = document.createElement("p");
            productDelete.className = "deleteItem";
            productDelete.innerHTML = "Supprimer";
            productItemContentSettingsDelete.appendChild(productDelete);

        }

        deleteProduct();
        changeQuantity();
        getTotals();

    }
}


getCart();

//  Gestion du total de la quantité et du prix 

async function getTotals() {

    // Récupération des produits du Local Storage 
    let productsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

    // Création d'une variable quantité et prix initialisé à 0

    let totalQuantity = 0;
    let totalPrice = 0;

    // Création d'une boucle qui parcours les produits du local storage

    for (product in productsInLocalStorage) {
        const items = await getProductDetails(productsInLocalStorage[product].id);
        totalQuantity += parseInt(productsInLocalStorage[product].quantity);
        totalPrice += parseInt(items.price * productsInLocalStorage[product].quantity);
    }
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;
}



//  Gestion de la suppression d'un article 

function deleteProduct() {
    let deleteBtn = document.querySelectorAll(".deleteItem")

    // Au click, on supprime un article 

    for (let j = 0; j < deleteBtn.length; j++) {
        deleteBtn[j].addEventListener("click", (event) => {
            event.preventDefault();
            let newStorage
            // Selection de l'élélement à supprimer en fonction de son ID et de sa couleur 
            let idDelete = deleteBtn[j].closest("article").dataset.id;
            let colorDelete = deleteBtn[j].closest("article").dataset.color;
            newStorage = productsInLocalStorage.filter(product => product.id !== idDelete || product.color !== colorDelete);

            localStorage.setItem("cartItems", JSON.stringify(newStorage));
            location.reload();

        })
    }
}


// Gestion de la modification de la quantité 

function changeQuantity() {
    let quantitySelector = document.querySelectorAll(".itemQuantity");

    // Au click, on modifier la quantité de l'article

    for (let k = 0; k < quantitySelector.length; k++) {
        quantitySelector[k].addEventListener("change", (event) => {
            event.preventDefault();
            if (event.target.value <= 0) {
                alert("Veuillez séléctionner une quantité supérieur à 0 ou supprimer l'article");
                return
            }
            else if (event.target.value > 100) {
                alert("Veuillez séléctionner une quantité inférieur à 100");
                return
            };

            let newStorage
            // On se positionne et cible l'élélement que l'on souhaite modifié en quantité
            let idModifQte = quantitySelector[k].closest("article").dataset.id;
            let colorModifQte = quantitySelector[k].closest("article").dataset.color;

            newStorage = productsInLocalStorage.map(product => {
                if (product.id === idModifQte && product.color === colorModifQte) {
                    return {
                        ...product,
                        quantity: parseInt(event.target.value)
                    }
                } else {
                    return product
                }
            })
            localStorage.setItem("cartItems", JSON.stringify(newStorage));
            location.reload();
        })
    }
}


// Récupération des produits de l'API
async function getProductDetails(productId) {
    try {
        const response = await fetch(
            "http://localhost:3000/api/products/" + productId
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Échec du chargement de l'API");
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Création des fonctions régulières du formulaire (regex)

let validNameRegExp = new RegExp("^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$");
let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
let adressRegExp = new RegExp("^([0-9]*) ?([a-zA-Z,\. ]*)$");
let cityRegExp = new RegExp("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$");

function getForm() {
    let form = document.querySelector(".cart__order__form");

    // On écoute les modifications du formulaire 

    form.firstName.addEventListener("change", function () {
        validFirstName(this);
    });

    form.lastName.addEventListener("change", function () {
        validLastName(this);
    });

    form.address.addEventListener("change", function () {
        validAddress(this);
    });

    form.city.addEventListener("change", function () {
        validCity(this);
    });

    form.email.addEventListener("change", function () {
        validEmail(this);
    });

    // On valide les entrées du formulaire 

    const validFirstName = function (inputFirstName) {
        let firstNameErrMsg = inputFirstName.nextElementSibling;

        if (validNameRegExp.test(inputFirstName.value)) {
            firstNameErrMsg.innerHTML = '';
        } else {
            firstNameErrMsg.innerHTML = "Saisie invalide, veuillez réessayer."
        }
    };

    const validLastName = function (inputLastName) {
        let lastNameErrMsg = inputLastName.nextElementSibling;

        if (validNameRegExp.test(inputLastName.value)) {
            lastNameErrMsg.innerHTML = '';
        } else {
            lastNameErrMsg.innerHTML = "Saisie invalide, veuillez réessayer."
        }
    };

    const validAddress = function (inputAddress) {
        let addressErrMsg = inputAddress.nextElementSibling;

        if (adressRegExp.test(inputAddress.value)) {
            addressErrMsg.innerHTML = '';
        } else {
            addressErrMsg.innerHTML = "Saisie invalide, veuillez réessayer."
        }
    };

    const validCity = function (inputCity) {
        let cityErrMsg = inputCity.nextElementSibling;

        if (cityRegExp.test(inputCity.value)) {
            cityErrMsg.innerHTML = '';
        } else {
            cityErrMsg.innerHTML = "Saisie invalide, veuillez réessayer."
        }
    };

    const validEmail = function (inputEmail) {
        let emailErrMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrMsg.innerHTML = '';
        } else {
            emailErrMsg.innerHTML = "Saisie invalide, veuillez réessayer."
        }
    };
}

getForm();

// Envoie du formulaire dans le local storage 

function postForm() {
    const commandBtn = document.getElementById("order");
    commandBtn.addEventListener("click", (event) => {
        event.preventDefault();

        // On récupère les informations du client
        let inputName = document.getElementById("firstName");
        let inputLastName = document.getElementById("lastName");
        let inputAddress = document.getElementById("address");
        let inputCity = document.getElementById("city");
        let inputEmail = document.getElementById("email");

        // On construit un tableau du local storage

        let products = [];
        for (let i = 0; i < products.length; i++) {
            products.push(productsInLocalStorage[products].id);
        }

        const order = {
            contact: {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputEmail.value,
            },
            products: products,
        }

        // On envoie les infos contact + products au serveur 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                "Content-type": "application/json"
            },
        };

        // On redirige l'utilisateur vers la page confirmation

        fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                localStorage.clear();
                localStorage.setItem("orderId", data.orderId);
                document.location.href = "confirmation.html";
            })
            .catch((err) => {
                alert("Problème avec fetch :" + err.message);
            })
    })
}

postForm();

