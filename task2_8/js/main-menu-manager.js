"use strict";
const menuOptionsButton = document.getElementById("menu-options-button");
const headMenuContainer = document.getElementById("head-menu-container");
const rightMenuButton = document.getElementById("right-menu-button");
const mainHeaderWrapper = document.getElementById("main-header-wrapper");
menuOptionsButton.addEventListener("click", () => {
    const totalHeight = document.documentElement.scrollHeight;
    headMenuContainer.style.height = String(totalHeight) + 'px';
    headMenuContainer.style.alignItems = 'start';
    menuOptionsButton.style.transform = "translateY(10px)";
    rightMenuButton.style.transform = "translateY(10px)";
    mainHeaderWrapper.style.transform = "translateY(-3px)";
});
