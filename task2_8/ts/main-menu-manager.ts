const menuOptionsButton = document.getElementById("menu-options-button") as HTMLElement;
const headMenuContainer = document.getElementById("head-menu-container") as HTMLElement;

menuOptionsButton.addEventListener("click", () => {
    const totalHeight = document.documentElement.scrollHeight;
    headMenuContainer.style.height = String(totalHeight) + 'px';
    headMenuContainer.style.alignItems = 'start';
})