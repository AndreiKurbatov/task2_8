import { menuOptionsButton, headMenuContainer, rightMenuButton, headMenuItemsContainer, headMenuLineContainer, closeHeadMenuItem, headerPhoto, parallaxHeader, parallaxParagraph } from './menu-elements.js';
menuOptionsButton.addEventListener("click", () => {
    const totalHeight = document.documentElement.scrollHeight;
    headMenuContainer.style.height = String(totalHeight) + 'px';
    headMenuContainer.style.alignItems = 'start';
    headMenuItemsContainer.style.display = 'flex';
    rightMenuButton.style.display = 'none';
    menuOptionsButton.style.display = 'none';
    headMenuLineContainer.style.justifyContent = 'center';
    headMenuLineContainer.style.transform = 'translateX(-20px)';
    headerPhoto.style.filter = 'brightness(0.4)';
    parallaxHeader.style.color = 'rgb(119 104 104)';
    parallaxParagraph.style.color = 'rgb(119 104 104)';
});
closeHeadMenuItem.addEventListener("click", () => {
    headMenuContainer.style.height = '';
    headMenuContainer.style.alignItems = '';
    headMenuItemsContainer.style.display = '';
    rightMenuButton.style.display = '';
    menuOptionsButton.style.display = '';
    headMenuLineContainer.style.justifyContent = '';
    headMenuLineContainer.style.transform = '';
    headerPhoto.style.filter = '';
    parallaxHeader.style.color = '';
    parallaxParagraph.style.color = '';
});
