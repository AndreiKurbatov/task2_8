import { handleInput } from "./searchBar.js"
import { getCityWeather } from "./weatherManagement.js"
import DailyWeather from "./DailyWeather.js"
import { updateCurrentWeatherUI } from "./dataSetter.js";
import { fetchWeeklyForecast } from "./dataSetter.js";

const goIcon = document.querySelector(".go-icon") as HTMLElement;
const searchInput = document.getElementById("search") as HTMLInputElement;

const weatherResponse: DailyWeather[] | null = await getCityWeather(handleInput());
updateCurrentWeatherUI(weatherResponse);
fetchWeeklyForecast(weatherResponse);

searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const weatherResponse: DailyWeather[] | null = await getCityWeather(handleInput());
        updateCurrentWeatherUI(weatherResponse);
        fetchWeeklyForecast(weatherResponse);
    }
});

goIcon.addEventListener("click", async () => {
    const weatherResponse: DailyWeather[] | null = await getCityWeather(handleInput());
    updateCurrentWeatherUI(weatherResponse);
    fetchWeeklyForecast(weatherResponse);
});


