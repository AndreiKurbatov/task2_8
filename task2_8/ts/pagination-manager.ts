import { Wine } from "./wine.js"
import { LocalStorageUtils } from "./local-storage-manager.js";

export class PaginationManager {
    private static readonly ITEMS_PER_PAGE = 6;
    private static totalPages: number;

    public static getPagesAmount(wines: Wine[] | null): number {
        if (wines) {
            this.totalPages = Math.ceil(wines.length / PaginationManager.ITEMS_PER_PAGE);
            return this.totalPages;
        } else {
            return -1;
        }
    }

    public static getWinesForPage(wines: Wine[], currentPageNumber: number): Wine[] | null {
        const startIndex = (currentPageNumber - 1) * PaginationManager.ITEMS_PER_PAGE;
        const endIndex = Math.min(startIndex + PaginationManager.ITEMS_PER_PAGE, wines.length);
        return wines.slice(startIndex, endIndex);
    }

    public static updateCurrentPageToNextPage(): boolean {
        let currentPage = LocalStorageUtils.getCurrentPage();
        const nextPage = currentPage + 1;
        if (nextPage <= this.totalPages) {
            LocalStorageUtils.setCurrentPage(nextPage);
            return true;
        }
        return false;
    }

    public static updateCurrentPageToPreviousPage(): boolean {
        let currentPage = LocalStorageUtils.getCurrentPage();
        const previousPage = currentPage - 1;
        if (previousPage >= 1) {
            LocalStorageUtils.setCurrentPage(previousPage);
            return true;
        }
        return false;
    }

}
