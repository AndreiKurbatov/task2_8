import { LocalStorageUtils } from "./local-storage-manager.js";
export class PaginationManager {
    static getPagesAmount(wines) {
        if (wines) {
            this.totalPages = Math.ceil(wines.length / PaginationManager.ITEMS_PER_PAGE);
            return this.totalPages;
        }
        else {
            return -1;
        }
    }
    static getWinesForPage(wines, currentPageNumber) {
        const startIndex = (currentPageNumber - 1) * PaginationManager.ITEMS_PER_PAGE;
        const endIndex = Math.min(startIndex + PaginationManager.ITEMS_PER_PAGE, wines.length);
        return wines.slice(startIndex, endIndex);
    }
    static updateCurrentPageToNextPage() {
        let currentPage = LocalStorageUtils.getCurrentPage();
        const nextPage = currentPage + 1;
        if (nextPage <= this.totalPages) {
            LocalStorageUtils.setCurrentPage(nextPage);
            return true;
        }
        return false;
    }
    static updateCurrentPageToPreviousPage() {
        let currentPage = LocalStorageUtils.getCurrentPage();
        const previousPage = currentPage - 1;
        if (previousPage >= 1) {
            LocalStorageUtils.setCurrentPage(previousPage);
            return true;
        }
        return false;
    }
}
PaginationManager.ITEMS_PER_PAGE = 6;
