"use strict";
const menuOptionsButton = document.getElementById("menu-options-button");
const headMenuContainer = document.getElementById("head-menu-container");
menuOptionsButton.addEventListener("click", () => {
    const totalHeight = document.documentElement.scrollHeight;
    headMenuContainer.style.height = String(totalHeight) + 'px';
    headMenuContainer.style.alignItems = 'start';
});
