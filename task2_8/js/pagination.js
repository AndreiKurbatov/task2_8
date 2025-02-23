"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const prevButton = document.querySelector(".paginate.left");
    const nextButton = document.querySelector(".paginate.right");
    const counter = document.querySelector(".counter");
    let index = 0;
    const total = 9;
    function updatePagination(offset) {
        index = Math.min(Math.max(index + offset, 0), total - 1);
        if (counter) {
            counter.textContent = `${index + 1} / ${total}`;
        }
        prevButton.setAttribute("data-state", index === 0 ? "disabled" : "");
        nextButton.setAttribute("data-state", index === total - 1 ? "disabled" : "");
    }
    if (prevButton)
        prevButton.addEventListener("click", () => updatePagination(-1));
    if (nextButton)
        nextButton.addEventListener("click", () => updatePagination(1));
    updatePagination(0);
});
