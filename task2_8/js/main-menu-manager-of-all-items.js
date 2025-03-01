import { menuOptionsButton, headMenuContainer, rightMenuButton, headMenuItemsContainer, headMenuLineContainer, closeHeadMenuItem, } from './menu-elements.js';
import { LocalStorageUtils } from "./local-storage-manager.js";
import { doPagination } from "./pagination-interface-manager.js";
menuOptionsButton.addEventListener("click", () => {
    const totalHeight = document.documentElement.scrollHeight;
    headMenuContainer.style.height = String(totalHeight) + 'px';
    headMenuContainer.style.alignItems = 'start';
    headMenuItemsContainer.style.display = 'flex';
    rightMenuButton.style.display = 'none';
    menuOptionsButton.style.display = 'none';
    headMenuLineContainer.style.justifyContent = 'center';
    headMenuLineContainer.style.transform = 'translateX(-20px)';
});
closeHeadMenuItem.addEventListener("click", () => {
    headMenuContainer.style.height = '';
    headMenuContainer.style.alignItems = '';
    headMenuItemsContainer.style.display = '';
    rightMenuButton.style.display = '';
    menuOptionsButton.style.display = '';
    headMenuLineContainer.style.justifyContent = '';
    headMenuLineContainer.style.transform = '';
});
export function generateWineItems(wines) {
    if (wines) {
        const container = document.getElementById("items-list-container");
        if (!container)
            return;
        container.innerHTML = '';
        wines.forEach(wine => {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("item-container");
            itemContainer.id = `item-container-${wine.id}`;
            itemContainer.innerHTML = `
            <div class="photo-container-desktop">
                <img src="./images/pexels-brettjordan-917831.jpg" class="photo" />
                <div class="add-button" data-id="${wine.id}">+</div>
            </div>
            <img src="./images/pexels-brettjordan-917831.jpg" class="photo" />
            <div class="add-button" data-id="${wine.id}">+</div>
            <div class="photo-description-container">
                <div class="item-name">${wine.name}</div>
                <div class="item-price">$${wine.price.toFixed(2)}</div>
                <div class="star-rating">
                    <div class="star-source">
                        <svg>
                            <linearGradient x1="50%" y1="5.41294643%" x2="87.5527344%" y2="65.4921875%" id="grad">
                                <stop stop-color="#bf209f" offset="0%"></stop>
                                <stop stop-color="#d62a9d" offset="60%"></stop>
                                <stop stop-color="#ED009E" offset="100%"></stop>
                            </linearGradient>
                            <symbol id="star" viewBox="153 89 106 108">
                                <polygon stroke="url(#grad)" stroke-width="5" fill="currentColor"
                                    points="206 162.5 176.610737 185.45085 189.356511 150.407797 158.447174 129.54915 195.713758 130.842203 206 95 216.286242 130.842203 253.552826 129.54915 222.643489 150.407797 235.389263 185.45085">
                                </polygon>
                            </symbol>
                        </svg>
                    </div>
                    <div class="star-container">
                        ${[5, 4, 3, 2, 1].map(star => `
                            <input type="radio" name="star" id="star-${wine.id}-${star}">
                            <label for="star-${wine.id}-${star}">
                                <svg class="star">
                                    <use xlink:href="#star" />
                                </svg>
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div class="item-producer">${wine.country}</div>
            </div>
        `;
            container.appendChild(itemContainer);
        });
    }
    else {
        console.log("The page cannot be generated because the wines are null");
    }
}
/*
export function addSearchHandling(): void {
    const searchInput = document.getElementById("search") as HTMLInputElement;
    const goIcon = document.getElementById("go-icon");

    async function handleSearch() {
        const searchText = searchInput.value.trim();
        if (searchText) {
            try {
                const filteredWines = await getWineByName(searchText);
                removeAllWineItemsFromList();
                generateWineItems(filteredWines);
            } catch (error) {
                console.error("Error populating interface with filtered wines", error);
            }
        }
    }

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    });

    if (goIcon) {
        goIcon.addEventListener("click", handleSearch);
    }
}
*/ /*
export function addSearchByTypeHandling(): void {
    const categoryContainer = document.querySelector(".all-items-container");
    if (categoryContainer) {
        categoryContainer.addEventListener("click", async (event) => {
            const target = event.target as HTMLElement;
            if (!target.classList.contains("item")) return;

            let type: number | null = null;
            switch (target.innerText.trim()) {
                case "Red Wine":
                    type = WineType.RED_WINE;
                    break;
                case "White Wine":
                    type = WineType.WHITE_WINE;
                    break;
                case "Rosé Wine":
                    type = WineType.ROSE_WINE;
                    break;
                case "All":
                    removeAllWineItemsFromList();
                    importData().then(generateWineItems);
                    return;
            }
            if (type !== null) {
                const wines = await getWineByType(type);
                removeAllWineItemsFromList();
                generateWineItems(wines);
            }
        });
    }
}
    */
/*
export function addSearchingByPriceRange(): void {
    const rangeSlider = document.getElementById("rs-range-line") as HTMLInputElement;
    const rangeBullet = document.getElementById("rs-bullet") as HTMLElement;

    if (rangeSlider && rangeBullet) {
        rangeSlider.addEventListener("input", async () => {
            const price = parseFloat(rangeSlider.value);
            const wines = await getWineByPrice(price);
            removeAllWineItemsFromList();
            generateWineItems(wines);
        });
    }
}
    */
export function addWineBagStorageFunctionality() {
    document.querySelectorAll(".add-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const target = event.target;
            const wineId = target.getAttribute("data-id");
            if (wineId) {
                LocalStorageUtils.addItemToUserBag(parseInt(wineId));
            }
        });
    });
}
/*
function removeAllWineItemsFromList(): void {
    const containers = document.querySelectorAll(".items-list-container .item-container");
    containers.forEach(container => container.remove());
}*/
export function addDynamicButtonsForSorting() {
    //updatePageCounter();
    addClickListener("red-wine-item");
    addClickListener("white-wine-item");
    addClickListener("rose-wine-item");
    addClickListener("all-wines-item");
    addEventListenerWithLogging("search", "keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            document.querySelectorAll(".all-items-container .item").forEach(item => {
                item.classList.remove("selected-item");
            });
            //updatePageCounter();
            doPagination();
        }
    });
    addEventListenerWithLogging("go-icon", "click", () => {
        document.querySelectorAll(".all-items-container .item").forEach(item => {
            item.classList.remove("selected-item");
        });
        //updatePageCounter();
        doPagination();
    });
    addEventListenerWithLogging("rs-range-line", "input", () => {
        //updatePageCounter();
        doPagination();
    });
}
function updateSelectedItem(selectedId) {
    var _a;
    document.querySelectorAll(".all-items-container .item").forEach(item => {
        item.classList.remove("selected-item");
    });
    (_a = document.getElementById(selectedId)) === null || _a === void 0 ? void 0 : _a.classList.add("selected-item");
}
/*
function updatePageCounter(): void {
    const currentPage = LocalStorageUtils.getCurrentPage();
    const totalPages = LocalStorageUtils.getPagesTotal();

    const pageCounterElement = document.getElementById("page-counter");
    if (pageCounterElement) {
        pageCounterElement.textContent = `${currentPage} / ${totalPages}`;
    }
}*/
function addClickListener(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener("click", () => {
            updateSelectedItem(elementId);
            //updatePageCounter();
            doPagination();
        });
    }
    else {
        console.error(`Element with ID '${elementId}' not found in the DOM!`);
    }
}
function addEventListenerWithLogging(elementId, eventType, callback) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener(eventType, callback);
    }
    else {
        console.error(`Element with ID '${elementId}' not found in the DOM!`);
    }
}
export function setInitialInterface() {
    var _a, _b, _c, _d;
    const searchType = LocalStorageUtils.getSearchType();
    const sortingParams = LocalStorageUtils.getSortingParameters();
    switch (searchType) {
        case 0:
            (_a = document.getElementById("all-wines-item")) === null || _a === void 0 ? void 0 : _a.classList.add("selected-item");
            break;
        case 1:
            const name = String(sortingParams["name"] || "");
            document.querySelectorAll(".all-items-container .item").forEach(item => {
                item.classList.remove("selected-item");
            });
            const searchInput = document.getElementById("search");
            if (searchInput) {
                searchInput.value = name;
            }
            break;
        case 2:
            document.querySelectorAll(".all-items-container .item").forEach(item => {
                item.classList.remove("selected-item");
            });
            const type = Number(sortingParams["type"]);
            switch (type) {
                case 0:
                    (_b = document.getElementById("red-wine-item")) === null || _b === void 0 ? void 0 : _b.classList.add("selected-item");
                    break;
                case 1:
                    (_c = document.getElementById("white-wine-item")) === null || _c === void 0 ? void 0 : _c.classList.add("selected-item");
                    break;
                case 2:
                    (_d = document.getElementById("rose-wine-item")) === null || _d === void 0 ? void 0 : _d.classList.add("selected-item");
                    break;
            }
            break;
        default:
    }
}
