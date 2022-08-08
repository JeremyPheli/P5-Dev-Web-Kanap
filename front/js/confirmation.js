// On affiche le numéro de commande sans le stocké 

function confirmation() {
    const idItem = document.getElementById("orderId");
    idItem.innerHTML = localStorage.getItem("orderId");
    localStorage.clear();
}

confirmation();