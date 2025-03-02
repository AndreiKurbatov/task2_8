import { menuOptionsButton, headMenuContainer, rightMenuButton, headMenuItemsContainer, headMenuLineContainer, closeHeadMenuItem, } from './menu-elements.js';
menuOptionsButton.addEventListener("click", () => {
    const totalHeight = document.documentElement.scrollHeight;
    headMenuContainer.style.height = String(totalHeight) + 'px';
    headMenuContainer.style.alignItems = 'start';
    headMenuItemsContainer.style.display = 'flex';
    rightMenuButton.style.display = 'none';
    menuOptionsButton.style.display = 'none';
    headMenuLineContainer.style.justifyContent = 'center';
    headMenuLineContainer.style.transform = 'translate(-20px, -3px)';
});
closeHeadMenuItem.addEventListener("click", () => {
    headMenuContainer.style.height = '';
    headMenuContainer.style.alignItems = '';
    headMenuItemsContainer.style.display = '';
    rightMenuButton.style.display = '';
    menuOptionsButton.style.display = '';
    headMenuLineContainer.style.justifyContent = '';
    headMenuLineContainer.style.transform = '';
});
