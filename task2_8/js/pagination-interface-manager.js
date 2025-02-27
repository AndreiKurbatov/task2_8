import { getWineByName, getWineByPrice, getWineByPriceAndType, getWineByType, importData } from "./data-importer.js";
import { PaginationManager } from "./pagination-manager.js";
import { generateWineItems, setInitialInterface } from "./main-menu-manager-of-all-items.js";
import { LocalStorageUtils } from "./local-storage-manager.js";
export async function addPaginationForButtons() {
    setInitialInterface();
    await doPagination();
    const nextPage = document.getElementById("next-page");
    if (nextPage) {
        nextPage.addEventListener("click", async () => {
            updatePagination(+1);
            await doPagination();
        });
    }
    else {
        console.log("The next-page element was not found");
    }
    const previousPage = document.getElementById("previous-page");
    if (previousPage) {
        previousPage.addEventListener("click", async () => {
            updatePagination(-1);
            await doPagination();
        });
    }
    else {
        console.log("The previous-page element was not found");
    }
}
export async function doPagination() {
    const searchType = LocalStorageUtils.getSearchType();
    switch (searchType) {
        case 0:
            await renderAll();
            break;
        case 1:
            await renderByName();
            break;
        case 2:
            await renderByType();
            break;
        case 3:
            await renderByPrice();
            break;
        case 4:
            await renderByPriceAndType();
            break;
        default:
            await renderAll();
    }
}
async function renderAll() {
    const currentPage = LocalStorageUtils.getCurrentPage();
    const wines = await importData();
    const winesPage = PaginationManager.getWinesForPage(wines, currentPage);
    generateWineItems(winesPage);
    const pagesAmount = PaginationManager.getPagesAmount(wines);
    LocalStorageUtils.setPagesTotal(pagesAmount);
    setPagesInitialValue();
}
async function renderByName() {
    const currentPage = LocalStorageUtils.getCurrentPage();
    const sortingParams = LocalStorageUtils.getSortingParameters();
    const name = String(sortingParams["name"]);
    const wines = await getWineByName(name);
    const winesPage = PaginationManager.getWinesForPage(wines, currentPage);
    generateWineItems(winesPage);
    const pagesAmount = PaginationManager.getPagesAmount(wines);
    LocalStorageUtils.setPagesTotal(pagesAmount);
    setPagesInitialValue();
}
async function renderByType() {
    const currentPage = LocalStorageUtils.getCurrentPage();
    const sortingParams = LocalStorageUtils.getSortingParameters();
    const type = Number(sortingParams["type"]);
    const wines = await getWineByType(type);
    const winesPage = PaginationManager.getWinesForPage(wines, currentPage);
    generateWineItems(winesPage);
    const pagesAmount = PaginationManager.getPagesAmount(wines);
    LocalStorageUtils.setPagesTotal(pagesAmount);
    setPagesInitialValue();
}
async function renderByPrice() {
    const currentPage = LocalStorageUtils.getCurrentPage();
    const sortingParams = LocalStorageUtils.getSortingParameters();
    const price = Number(sortingParams["price"]);
    const wines = await getWineByPrice(price);
    const winesPage = PaginationManager.getWinesForPage(wines, currentPage);
    generateWineItems(winesPage);
    const pagesAmount = PaginationManager.getPagesAmount(wines);
    LocalStorageUtils.setPagesTotal(pagesAmount);
    setPagesInitialValue();
}
async function renderByPriceAndType() {
    const currentPage = LocalStorageUtils.getCurrentPage();
    const sortingParams = LocalStorageUtils.getSortingParameters();
    const price = Number(sortingParams["price"]);
    const type = Number(sortingParams["type"]);
    const wines = await getWineByPriceAndType(type, price);
    const winesPage = PaginationManager.getWinesForPage(wines, currentPage);
    generateWineItems(winesPage);
    const pagesAmount = PaginationManager.getPagesAmount(wines);
    LocalStorageUtils.setPagesTotal(pagesAmount);
    setPagesInitialValue();
}
function setPagesInitialValue() {
    const currentPage = LocalStorageUtils.getCurrentPage();
    const totalPages = LocalStorageUtils.getPagesTotal();
    const counter = document.getElementById("page-counter");
    const prevButton = document.getElementById("previous-page");
    const nextButton = document.getElementById("next-page");
    if (counter) {
        prevButton.setAttribute("data-state", currentPage === 1 ? "disabled" : "");
        nextButton.setAttribute("data-state", currentPage === totalPages ? "disabled" : "");
    }
    const pageCounterElement = document.getElementById("page-counter");
    if (pageCounterElement) {
        pageCounterElement.textContent = `${currentPage} / ${totalPages}`;
    }
}
function updatePagination(offset) {
    const totalPages = LocalStorageUtils.getPagesTotal();
    const counter = document.getElementById("page-counter");
    const prevButton = document.getElementById("previous-page");
    const nextButton = document.getElementById("next-page");
    if (counter) {
        if (offset > 0 && PaginationManager.updateCurrentPageToNextPage()) {
            const currentPage = LocalStorageUtils.getCurrentPage();
            prevButton.setAttribute("data-state", currentPage === 1 ? "disabled" : "");
            nextButton.setAttribute("data-state", currentPage === totalPages ? "disabled" : "");
            counter.textContent = `${currentPage} / ${totalPages}`;
        }
        else if (offset < 0 && PaginationManager.updateCurrentPageToPreviousPage()) {
            const currentPage = LocalStorageUtils.getCurrentPage();
            counter.textContent = `${currentPage} / ${totalPages}`;
            prevButton.setAttribute("data-state", currentPage === 1 ? "disabled" : "");
            nextButton.setAttribute("data-state", currentPage === totalPages ? "disabled" : "");
        }
    }
}
