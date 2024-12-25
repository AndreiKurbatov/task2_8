import ColorGenerator  from './ColorGenerator.js'

const pageStyle = document.getElementById("page-style") as HTMLElement;
const internalTitle = document.getElementById("background-internal-title") as HTMLElement;
const button = document.getElementById("button") as HTMLElement;
const colorGenerator = new ColorGenerator();

window.onload = () => {
    const hex = colorGenerator.generateColor();

    pageStyle.style.backgroundColor = hex;
    internalTitle.style.color = hex;
    internalTitle.innerHTML = hex.slice(1);
};

button.addEventListener("mousedown", () => {
    const hex = colorGenerator.generateColor();

    pageStyle.style.backgroundColor = hex;
    internalTitle.style.color = hex;
    internalTitle.innerHTML = hex.slice(1);
});