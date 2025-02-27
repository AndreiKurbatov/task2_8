import { LocalStorageUtils } from "./local-storage-manager.js";
import { WineType } from "./wine-type.js";
export function addSorting() {
    var _a, _b, _c, _d, _e, _f, _g;
    (_a = document.getElementById("red-wine-item")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        LocalStorageUtils.setCurrentPage(1);
        let sortingParams = LocalStorageUtils.getSortingParameters();
        const hasPrice = "price" in sortingParams;
        if (hasPrice) {
            LocalStorageUtils.setSearchType(4);
        }
        else {
            LocalStorageUtils.setSearchType(2);
        }
        sortingParams = hasPrice ? { price: sortingParams["price"] } : {};
        sortingParams["type"] = WineType.RED_WINE;
        LocalStorageUtils.setSortingParameters(sortingParams);
    });
    (_b = document.getElementById("white-wine-item")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        LocalStorageUtils.setCurrentPage(1);
        let sortingParams = LocalStorageUtils.getSortingParameters();
        const hasPrice = "price" in sortingParams;
        if (hasPrice) {
            LocalStorageUtils.setSearchType(4);
        }
        else {
            LocalStorageUtils.setSearchType(2);
        }
        sortingParams = hasPrice ? { price: sortingParams["price"] } : {};
        sortingParams["type"] = WineType.WHITE_WINE;
        LocalStorageUtils.setSortingParameters(sortingParams);
    });
    (_c = document.getElementById("rose-wine-item")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        LocalStorageUtils.setCurrentPage(1);
        let sortingParams = LocalStorageUtils.getSortingParameters();
        const hasPrice = "price" in sortingParams;
        if (hasPrice) {
            LocalStorageUtils.setSearchType(4);
        }
        else {
            LocalStorageUtils.setSearchType(2);
        }
        sortingParams = hasPrice ? { price: sortingParams["price"] } : {};
        sortingParams["type"] = WineType.ROSE_WINE;
        LocalStorageUtils.setSortingParameters(sortingParams);
    });
    (_d = document.getElementById("all-wines-item")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        LocalStorageUtils.setCurrentPage(1);
        LocalStorageUtils.setSortingParameters({});
        LocalStorageUtils.setSearchType(0);
    });
    (_e = document.getElementById("rs-range-line")) === null || _e === void 0 ? void 0 : _e.addEventListener("input", (event) => {
        const target = event.target;
        const selectedPrice = Number(target.value);
        LocalStorageUtils.setCurrentPage(1);
        let sortingParams = LocalStorageUtils.getSortingParameters();
        const hasType = "type" in sortingParams;
        LocalStorageUtils.setSearchType(hasType ? 4 : 3);
        sortingParams = hasType ? { type: sortingParams["type"] } : {};
        sortingParams["price"] = selectedPrice;
        LocalStorageUtils.setSortingParameters(sortingParams);
    });
    (_f = document.getElementById("search")) === null || _f === void 0 ? void 0 : _f.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    });
    (_g = document.getElementById("go-icon")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
        handleSearch();
    });
    function handleSearch() {
        var _a;
        const searchInput = (_a = document.getElementById("search")) === null || _a === void 0 ? void 0 : _a.value.trim();
        if (!searchInput)
            return;
        LocalStorageUtils.setCurrentPage(1);
        LocalStorageUtils.setSearchType(1);
        LocalStorageUtils.setSortingParameters({ name: searchInput });
    }
}
