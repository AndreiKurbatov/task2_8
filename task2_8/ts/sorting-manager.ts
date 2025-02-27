import { LocalStorageUtils } from "./local-storage-manager.js";
import { WineType } from "./wine-type.js";

export function addSorting() {

    document.getElementById("red-wine-item")?.addEventListener("click", () => {
        LocalStorageUtils.setCurrentPage(1);
        let sortingParams = LocalStorageUtils.getSortingParameters();
        const hasPrice = "price" in sortingParams;
        if (hasPrice) {
            LocalStorageUtils.setSearchType(4);
        } else {
            LocalStorageUtils.setSearchType(2);
        }
        sortingParams = hasPrice ? {price : sortingParams["price"]} : {}
        sortingParams["type"] = WineType.RED_WINE;
        LocalStorageUtils.setSortingParameters(sortingParams);
    });

    document.getElementById("white-wine-item")?.addEventListener("click", () => {
        LocalStorageUtils.setCurrentPage(1);
        let sortingParams = LocalStorageUtils.getSortingParameters();
        const hasPrice = "price" in sortingParams;
        if (hasPrice) {
            LocalStorageUtils.setSearchType(4);
        } else {
            LocalStorageUtils.setSearchType(2);
        }
        sortingParams = hasPrice ? {price : sortingParams["price"]} : {}
        sortingParams["type"] = WineType.WHITE_WINE;
        LocalStorageUtils.setSortingParameters(sortingParams);
    });

    document.getElementById("rose-wine-item")?.addEventListener("click", () => {
        LocalStorageUtils.setCurrentPage(1);
        let sortingParams = LocalStorageUtils.getSortingParameters();
        const hasPrice = "price" in sortingParams;
        if (hasPrice) {
            LocalStorageUtils.setSearchType(4);
        } else {
            LocalStorageUtils.setSearchType(2);
        }
        sortingParams = hasPrice ? {price : sortingParams["price"]} : {}
        sortingParams["type"] = WineType.ROSE_WINE;
        LocalStorageUtils.setSortingParameters(sortingParams);
    });

    document.getElementById("all-wines-item")?.addEventListener("click", () => {
        LocalStorageUtils.setCurrentPage(1);
        LocalStorageUtils.setSortingParameters({});
        LocalStorageUtils.setSearchType(0);
    });

    document.getElementById("rs-range-line")?.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement;
        const selectedPrice = Number(target.value);
        LocalStorageUtils.setCurrentPage(1);
        let sortingParams = LocalStorageUtils.getSortingParameters();
        const hasType = "type" in sortingParams;
        LocalStorageUtils.setSearchType(hasType ? 4 : 3);
        sortingParams = hasType ? {type : sortingParams["type"]} : {};
        sortingParams["price"] = selectedPrice;
        LocalStorageUtils.setSortingParameters(sortingParams);
    })

    document.getElementById("search")?.addEventListener("keypress", (event) => {
        if ((event as KeyboardEvent).key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    });

    document.getElementById("go-icon")?.addEventListener("click", () => {
        handleSearch();
    });

    function handleSearch() {
        const searchInput = (document.getElementById("search") as HTMLInputElement)?.value.trim();
        if (!searchInput) return;
        LocalStorageUtils.setCurrentPage(1);
        LocalStorageUtils.setSearchType(1);
        LocalStorageUtils.setSortingParameters({ name: searchInput });
    }

}