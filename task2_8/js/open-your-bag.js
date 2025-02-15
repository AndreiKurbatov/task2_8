"use strict";
const shoppingCartContainer = document.getElementById("shopping-cart-container");
const yourBagContainer = document.getElementById("your-bag-container");
const yourBagCloseSign = document.getElementById("your-bag-close-sign");
if (shoppingCartContainer && yourBagContainer && yourBagCloseSign) {
    shoppingCartContainer.addEventListener("click", () => {
        yourBagContainer.style.display = "flex";
    });
    yourBagCloseSign.addEventListener("click", () => {
        yourBagContainer.style.display = "none";
    });
}
else {
    console.error("The element shoppingCartContainer or yourBagContainer or yourBagCloseSign were not found");
}
