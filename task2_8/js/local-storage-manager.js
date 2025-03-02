export class LocalStorageUtils {
    static initializeLocalStorage() {
        if (!localStorage.getItem(this.userBagKey)) {
            localStorage.setItem(this.userBagKey, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.userBagQuantityKey)) {
            localStorage.setItem(this.userBagQuantityKey, JSON.stringify({}));
        }
        if (!localStorage.getItem(this.currentPage)) {
            localStorage.setItem(this.currentPage, JSON.stringify(1)); // Default page = 1
        }
        if (!localStorage.getItem(this.sortingParameters)) {
            localStorage.setItem(this.sortingParameters, JSON.stringify({}));
        }
        if (!localStorage.getItem(this.searchType)) {
            localStorage.setItem(this.searchType, JSON.stringify(0)); // Default = all
        }
    }
    static addItemToUserBag(id) {
        let bag = JSON.parse(localStorage.getItem(this.userBagKey) || "[]");
        let quantities = JSON.parse(localStorage.getItem(this.userBagQuantityKey) || "{}");
        if (!bag.includes(id)) {
            bag.push(id);
            localStorage.setItem(this.userBagKey, JSON.stringify(bag));
        }
        else {
            quantities[id] = (quantities[id] || 0) + 1;
        }
        localStorage.setItem(this.userBagKey, JSON.stringify(bag));
        localStorage.setItem(this.userBagQuantityKey, JSON.stringify(quantities));
    }
    static removeItemFromUserBag(id) {
        let bag = JSON.parse(localStorage.getItem(this.userBagKey) || "[]");
        let quantities = JSON.parse(localStorage.getItem(this.userBagQuantityKey) || "{}");
        if (quantities[id] && quantities[id] > 1) {
            quantities[id] -= 1;
        }
        else {
            bag = bag.filter(item => item !== id);
            delete quantities[id];
        }
        localStorage.setItem(this.userBagKey, JSON.stringify(bag));
        localStorage.setItem(this.userBagQuantityKey, JSON.stringify(quantities));
    }
    static getUserBagContent() {
        return JSON.parse(localStorage.getItem(this.userBagKey) || "[]");
    }
    static getUserBagQuantities() {
        return JSON.parse(localStorage.getItem(this.userBagQuantityKey) || "{}");
    }
    static getSortingParameters() {
        return JSON.parse(localStorage.getItem(this.sortingParameters) || "{}");
    }
    static setSortingParameters(params) {
        localStorage.setItem(this.sortingParameters, JSON.stringify(params));
    }
    static getSearchType() {
        return JSON.parse(localStorage.getItem(this.searchType) || "0");
    }
    static setSearchType(type) {
        localStorage.setItem(this.searchType, JSON.stringify(type));
    }
    static getCurrentPage() {
        return JSON.parse(localStorage.getItem(this.currentPage) || "1");
    }
    static setCurrentPage(page) {
        localStorage.setItem(this.currentPage, JSON.stringify(page));
    }
    static getPagesTotal() {
        return JSON.parse(localStorage.getItem(this.pagesTotal) || "1");
    }
    static setPagesTotal(page) {
        localStorage.setItem(this.pagesTotal, JSON.stringify(page));
    }
}
LocalStorageUtils.userBagKey = "userBagContent";
LocalStorageUtils.userBagQuantityKey = "userBagQuantity";
LocalStorageUtils.currentPage = "currentPage";
LocalStorageUtils.pagesTotal = "pagesTotal";
/*
* "sortingParametersMap" : {
*   "type" : "1",
*   "price" : "39",
*   "name" : "Barolo"
* }
*/
LocalStorageUtils.sortingParameters = "sortingParametersMap";
/*
* "searchType" : "0" // all
* "searchType" : "1" // search by name
* "searchType" : "2" // search by type
* "searchType" : "3" // search by price
* "searchType" : "4" // search by price and type
*/
LocalStorageUtils.searchType = "searchType";
