import { addPaginationForButtons } from "./pagination-interface-manager.js";
import { addSorting } from "./sorting-manager.js";
document.addEventListener("DOMContentLoaded", async () => {
    await addPaginationForButtons();
    addSorting();
});
