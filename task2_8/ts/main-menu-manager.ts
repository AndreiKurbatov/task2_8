const menuOptionsButton = document.getElementById("menu-options-button") as HTMLElement;
const headMenuContainer = document.getElementById("head-menu-container") as HTMLElement;
const rightMenuButton = document.getElementById("right-menu-button") as HTMLElement;
const mainHeaderWrapper = document.getElementById("main-header-wrapper") as HTMLElement;

menuOptionsButton.addEventListener("click", () => {
    const totalHeight = document.documentElement.scrollHeight;
    headMenuContainer.style.height = String(totalHeight) + 'px';
    headMenuContainer.style.alignItems = 'start';
    menuOptionsButton.style.transform = "translateY(10px)";
    rightMenuButton.style.transform = "translateY(10px)";
    mainHeaderWrapper.style.transform = "translateY(-3px)"
})