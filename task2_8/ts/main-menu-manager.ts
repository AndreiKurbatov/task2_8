const menuOptionsButton = document.getElementById("menu-options-button") as HTMLElement;
const headMenuContainer = document.getElementById("head-menu-container") as HTMLElement;
const rightMenuButton = document.getElementById("right-menu-button") as HTMLElement;
const headMenuItemsContainer = document.getElementById("head-menu-items-container") as HTMLElement;
const headMenuLineContainer = document.getElementById("head-menu-line-container") as HTMLElement;
const closeHeadMenuItem = document.getElementById("close-head-menu-item") as HTMLElement;
const headerPhoto = document.querySelector(".parallax-photo-container .photo") as HTMLElement;
const parallaxHeader = document.querySelector(".parallax-photo-container .header") as HTMLElement;
const parallaxParagraph = document.querySelector(".parallax-photo-container .paragraph") as HTMLElement;

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
})

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
})