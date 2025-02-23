import { generateWineItems } from "./main-menu-manager-of-all-items.js";
import { importData } from "./data-importer.js";
import { addSearchHandling,
    addSearchByTypeHandling,
    addSearchingByPriceRange,
    addWineBagStorageFunctionality } from "./main-menu-manager-of-all-items.js"

document.addEventListener("DOMContentLoaded", async() => {
    await importData().then(generateWineItems);
    addSearchHandling();
    addSearchByTypeHandling();
    addSearchingByPriceRange();
    addWineBagStorageFunctionality();
});

