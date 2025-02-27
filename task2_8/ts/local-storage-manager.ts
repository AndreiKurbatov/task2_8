export class LocalStorageUtils {
    private static userBagKey: string = "userBagContent";
    private static userBagQuantityKey: string = "userBagQuantity";
    private static currentPage : string = "currentPage";
    private static pagesTotal : string =  "pagesTotal";
    /*
    * "sortingParametersMap" : {
    *   "type" : "1",
    *   "price" : "39",
    *   "name" : "Barolo"
    * }
    */
    private static sortingParameters : string = "sortingParametersMap";
    /*
    * "searchType" : "0" // all
    * "searchType" : "1" // search by name
    * "searchType" : "2" // search by type
    * "searchType" : "3" // search by price
    * "searchType" : "4" // search by price and type
    */
    private static searchType : string = "searchType";

    static initializeLocalStorage(): void {
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

    static addItemToUserBag(id: number): void {
        let bag: number[] = JSON.parse(localStorage.getItem(this.userBagKey) || "[]");
        let quantities: Record<number, number> = JSON.parse(localStorage.getItem(this.userBagQuantityKey) || "{}");

        if (!bag.includes(id)) {
            bag.push(id);
            localStorage.setItem(this.userBagKey, JSON.stringify(bag));
        }
        quantities[id] = (quantities[id] || 0) + 1;

        localStorage.setItem(this.userBagKey, JSON.stringify(bag));
        localStorage.setItem(this.userBagQuantityKey, JSON.stringify(quantities));

    }

    static removeItemFromUserBag(id: number): void {
        let bag: number[] = JSON.parse(localStorage.getItem(this.userBagKey) || "[]");
        let quantities: Record<number, number> = JSON.parse(localStorage.getItem(this.userBagQuantityKey) || "{}");

        if (quantities[id] && quantities[id] > 1) {
            quantities[id] -= 1;
        } else {
            bag = bag.filter(item => item !== id);
            delete quantities[id];
        }

        localStorage.setItem(this.userBagKey, JSON.stringify(bag));
        localStorage.setItem(this.userBagQuantityKey, JSON.stringify(quantities));
    }

    static getUserBagContent(): number[] {
        return JSON.parse(localStorage.getItem(this.userBagKey) || "[]");
    }

    static getUserBagQuantities(): Record<number, number> {
        return JSON.parse(localStorage.getItem(this.userBagQuantityKey) || "{}");
    }

    static getSortingParameters(): Record<string, string | number> {
        return JSON.parse(localStorage.getItem(this.sortingParameters) || "{}");
    }

    static setSortingParameters(params: Record<string, string | number>): void {
        localStorage.setItem(this.sortingParameters, JSON.stringify(params));
    }

    static getSearchType(): number {
        return JSON.parse(localStorage.getItem(this.searchType) || "0");
    }

    static setSearchType(type: number): void {
        localStorage.setItem(this.searchType, JSON.stringify(type));
    }

    static getCurrentPage(): number {
        return JSON.parse(localStorage.getItem(this.currentPage) || "1");
    }

    static setCurrentPage(page: number): void {
        localStorage.setItem(this.currentPage, JSON.stringify(page));
    }

    static getPagesTotal(): number {
        return JSON.parse(localStorage.getItem(this.pagesTotal) || "1");
    }

    static setPagesTotal(page: number): void {
        localStorage.setItem(this.pagesTotal, JSON.stringify(page));
    }

}