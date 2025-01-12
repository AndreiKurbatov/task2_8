const searchInput = document.getElementById("search") as HTMLInputElement;
const searchBox = document.querySelector(".search-box") as HTMLElement;
const searchIcon = document.querySelector(".search-icon") as HTMLElement;
const goIcon = document.querySelector(".go-icon") as HTMLElement;
const searchForm = document.querySelector(".search-form") as HTMLFormElement;

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
    } else {
        goIcon.classList.remove("go-in");
    }
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        return handleInput();
    }
});

goIcon.addEventListener("click", () => {
    return handleInput();
});

export function handleInput(): string {
    const userInput = searchInput!.value.trim() || ""
    console.log("The city name is " + userInput);
    return userInput;
}
