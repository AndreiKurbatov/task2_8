import { addPaginationForButtons } from "./pagination-interface-manager.js";
import { addSorting } from "./sorting-manager.js";
import { addDynamicButtonsForSorting, addWineBagStorageFunctionality } from "./main-menu-manager-of-all-items.js";
document.addEventListener("DOMContentLoaded", async () => {
    await addPaginationForButtons();
    addSorting();
    addDynamicButtonsForSorting();
    addWineBagStorageFunctionality();
});
