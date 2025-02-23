import { getWineById } from "./data-importer.js";
import { headMenuContainer } from "./menu-elements.js";
import { LocalStorageUtils } from "./local-storage-manager.js";
const shoppingCartContainer = document.getElementById("shopping-cart-container");
const shoppingCartContainerDesktop = document.getElementById("shopping-cart-container-desktop");
const yourBagContainer = document.getElementById("your-bag-container");
const yourBagCloseSign = document.getElementById("your-bag-close-sign");
const headerPostfix = document.getElementById("header-postfix-desktop");
const headerPrefix = document.getElementById("header-prefix-desktop");
const firstItem = document.querySelector(".head-menu-items-container .item:nth-child(1)");
const allItemsExceptFirst = document.querySelectorAll(".head-menu-items-container .item:not(:first-child)");
export function generateBagItems(wines) {
    const container = document.querySelector(".bag-item-container");
    if (!container)
        return;
    container.innerHTML = "";
    const bagQuantities = LocalStorageUtils.getUserBagQuantities();
    wines.forEach(wine => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");
        itemContainer.setAttribute("data-id", wine.id.toString());
        const quantity = bagQuantities[wine.id] || 1;
        itemContainer.innerHTML = `
            <div class="photo-container">
                <img src="./images/pexels-brettjordan-917831.jpg" class="photo" />
                <div class="photo-note-container">
                    <div class="item-name">${wine.name}</div>
                    <div class="item-price">$${wine.price.toFixed(2)}</div>
                </div>
            </div>
            <div class="items-amount-container">
                <div class="items-amount">${quantity}</div>
                <div class="remove-item">&#x2715;</div>
            </div>
        `;
        container.appendChild(itemContainer);
    });
}
window.addEventListener("resize", () => {
    const innerWidth = window.innerWidth;
    if (innerWidth <= 768) {
        if (parseInt(window.getComputedStyle(yourBagContainer).maxHeight) !== 0) {
            unsetSettings();
            renderYourBagForMobile();
        }
    }
    else {
        if (parseInt(window.getComputedStyle(yourBagContainer).maxHeight) !== 0) {
            unsetSettings();
            renderYourBagForDesktop();
        }
    }
});
shoppingCartContainer.addEventListener("click", async () => {
    renderYourBagForMobile();
    await renderYourBagContent();
    addMyBagFunctionality();
});
shoppingCartContainerDesktop.addEventListener("click", async () => {
    renderYourBagForDesktop();
    await renderYourBagContent();
    addMyBagFunctionality();
});
yourBagCloseSign.addEventListener("click", () => {
    unsetSettings();
});
function addMyBagFunctionality() {
    document.querySelectorAll(".items-amount").forEach(amountContainer => {
        amountContainer.addEventListener("click", (event) => {
            const mouseEvent = event;
            const target = event.currentTarget;
            const rect = target.getBoundingClientRect();
            const clickPosition = mouseEvent.clientX - rect.left;
            const middlePoint = rect.width / 2;
            const itemContainer = target.closest(".item-container");
            if (!itemContainer)
                return;
            const wineId = itemContainer.getAttribute("data-id");
            if (!wineId)
                return;
            const currentAmount = parseInt(target.textContent || "0");
            if (clickPosition > middlePoint) {
                LocalStorageUtils.addItemToUserBag(parseInt(wineId));
                target.textContent = (currentAmount + 1).toString();
            }
            else {
                if (currentAmount > 1) {
                    LocalStorageUtils.removeItemFromUserBag(parseInt(wineId));
                    target.textContent = (currentAmount - 1).toString();
                }
            }
            calculateTotalSum();
        });
    });
    document.querySelectorAll(".remove-item").forEach(bagItem => {
        bagItem.addEventListener("click", async (event) => {
            const target = event.target;
            const itemContainer = target.closest(".item-container");
            if (!itemContainer)
                return;
            const wineId = itemContainer.getAttribute("data-id");
            if (wineId) {
                const idNumber = parseInt(wineId);
                while (LocalStorageUtils.getUserBagQuantities()[idNumber] > 0) {
                    LocalStorageUtils.removeItemFromUserBag(idNumber);
                }
                itemContainer.remove();
            }
            calculateTotalSum();
        });
    });
}
function calculateTotalSum() {
    const bagQuantities = LocalStorageUtils.getUserBagQuantities();
    const bagContent = Object.keys(bagQuantities).map(id => parseInt(id));
    Promise.all(bagContent.map(id => getWineById(id))).then(wines => {
        const totalSum = wines.reduce((sum, wine) => {
            if (wine) {
                return sum + (wine.price * (bagQuantities[wine.id] || 1));
            }
            return sum;
        }, 0);
        const totalSumElement = document.getElementById("total-sum");
        if (totalSumElement) {
            totalSumElement.textContent = `$${totalSum.toFixed(2)}`;
        }
    });
}
async function renderYourBagContent() {
    const bagContent = LocalStorageUtils.getUserBagContent();
    const wines = await Promise.all(bagContent.map(id => getWineById(id)));
    generateBagItems(wines.filter(wine => wine !== null));
    calculateTotalSum();
}
function renderYourBagForMobile() {
    const totalHeight = document.documentElement.scrollHeight;
    headMenuContainer.style.height = String(totalHeight) + 'px';
    const items = yourBagContainer.querySelectorAll('.bag-item-container .item-container');
    let totalYourBagHeight = 0;
    items.forEach(item => {
        totalYourBagHeight += item.offsetHeight;
    });
    yourBagContainer.style.maxHeight = totalHeight + "px";
}
function renderYourBagForDesktop() {
    const totalHeight = document.documentElement.scrollHeight;
    headMenuContainer.style.height = String(totalHeight) + 'px';
    const items = yourBagContainer.querySelectorAll('.bag-item-container .item-container');
    let totalYourBagHeight = 0;
    items.forEach(item => {
        totalYourBagHeight += item.offsetHeight;
    });
    yourBagContainer.style.maxHeight = totalHeight + "px";
    headMenuContainer.style.backgroundColor = '#000000cc';
    headerPostfix.style.color = '#421717';
    headerPostfix.style.backgroundColor = 'transparent';
    headerPrefix.style.color = '#421717';
    firstItem.style.color = '#421717';
    allItemsExceptFirst.forEach(item => {
        item.style.color = '#421717';
    });
}
function unsetSettings() {
    headMenuContainer.style.backgroundColor = '';
    headMenuContainer.style.height = '';
    yourBagContainer.style.width = '';
    yourBagContainer.style.maxHeight = "0";
    yourBagContainer.style.right = '';
    headerPostfix.style.color = '';
    headerPostfix.style.backgroundColor = '';
    headerPrefix.style.color = '';
    firstItem.style.color = '';
    allItemsExceptFirst.forEach(item => {
        item.style.color = '';
    });
}
