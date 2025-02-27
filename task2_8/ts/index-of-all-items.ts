import { /*addSearchHandling,
    addSearchByTypeHandling,
    addSearchingByPriceRange,*/
    addWineBagStorageFunctionality,
    addDynamicButtonsForSorting
} from "./main-menu-manager-of-all-items.js";
import { addPaginationForButtons } from "./pagination-interface-manager.js";
import { addSorting } from "./sorting-manager.js";

document.addEventListener("DOMContentLoaded", async () => {
    await addPaginationForButtons();
    addSorting();
    addDynamicButtonsForSorting();

    /*addSearchHandling();
    addSearchByTypeHandling();
    addSearchingByPriceRange();*/
    addWineBagStorageFunctionality();
});