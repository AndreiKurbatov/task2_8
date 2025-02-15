const searchInput = document.getElementById("search");
const searchBox = document.querySelector(".search-box");
const searchIcon = document.querySelector(".search-icon");
const goIcon = document.querySelector(".go-icon");
searchInput.addEventListener("focus", () => {
    searchBox.classList.add("border-searching");
    searchIcon.classList.add("si-rotate");
});
searchInput.addEventListener("blur", () => {
    searchBox.classList.remove("border-searching");
    searchIcon.classList.remove("si-rotate");
});
searchInput.addEventListener("keyup", () => {
    if (searchInput.value.length > 0) {
        goIcon.classList.add("go-in");
    }
    else {
        goIcon.classList.remove("go-in");
    }
});
export function handleInput() {
    const userInput = searchInput.value.trim() || "";
    return userInput;
}
