import { handleInput } from "./searchBar.js";
import { getCityWeather } from "./weatherManagement.js";
import { updateCurrentWeatherUI } from "./dataSetter.js";
import { fetchWeeklyForecast } from "./dataSetter.js";
const goIcon = document.querySelector(".go-icon");
const searchInput = document.getElementById("search");
const weatherResponse = await getCityWeather(handleInput());
updateCurrentWeatherUI(weatherResponse);
fetchWeeklyForecast(weatherResponse);
searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const weatherResponse = await getCityWeather(handleInput());
        updateCurrentWeatherUI(weatherResponse);
        fetchWeeklyForecast(weatherResponse);
    }
});
goIcon.addEventListener("click", async () => {
    const weatherResponse = await getCityWeather(handleInput());
    updateCurrentWeatherUI(weatherResponse);
    fetchWeeklyForecast(weatherResponse);
});
