import { headMenuContainer } from "./menu-elements.js";

const shoppingCartContainer = document.getElementById("shopping-cart-container") as HTMLElement;
const yourBagContainer = document.getElementById("your-bag-container") as HTMLElement;
const yourBagCloseSign = document.getElementById("your-bag-close-sign") as HTMLElement;

shoppingCartContainer.addEventListener("click", () => {
    const totalHeight = document.documentElement.scrollHeight;
    headMenuContainer.style.height = String(totalHeight) + 'px';
    const items = yourBagContainer.querySelectorAll('.bag-item-container .item-container');
    let totalYourBagHeight = 0;
    items.forEach(item => {
        totalYourBagHeight += (item as HTMLElement).offsetHeight;
    })
    yourBagContainer.style.maxHeight = totalHeight + "px";
});

yourBagCloseSign.addEventListener("click", () => {
    headMenuContainer.style.height = '';
    yourBagContainer.style.maxHeight = "0";
});

