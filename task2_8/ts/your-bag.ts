const shoppingCartContainer = document.getElementById("shopping-cart-container") as HTMLElement;
const yourBagContainer = document.getElementById("your-bag-container") as HTMLElement;
const yourBagCloseSign = document.getElementById("your-bag-close-sign") as HTMLElement;

if (shoppingCartContainer && yourBagContainer && yourBagCloseSign) {

    shoppingCartContainer.addEventListener("click", () => {
        yourBagContainer.style.display = "flex";
    })

    yourBagCloseSign.addEventListener("click", () => {
        yourBagContainer.style.display = "none";
    })

} else {
    console.error("The element shoppingCartContainer or yourBagContainer or yourBagCloseSign were not found");
}