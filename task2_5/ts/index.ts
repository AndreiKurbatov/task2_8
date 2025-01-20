import { handleInput } from "./searchBar.js";
import { getCityWeather } from "./weatherManagement.js";
import DailyWeather from "./DailyWeather.js";
import { updateCurrentWeatherUI, fetchWeeklyForecast, toggleLoading, setErrorMessage } from "./dataSetter.js";

const goIcon = document.querySelector(".go-icon") as HTMLElement;
const searchInput = document.getElementById("search") as HTMLInputElement;

(async () => {
    toggleLoading(true);
    const weatherResponse: DailyWeather[] | null = await getCityWeather(handleInput());
    toggleLoading(false);
    if (weatherResponse) {
        updateCurrentWeatherUI(weatherResponse);
        fetchWeeklyForecast(weatherResponse);
    }
})();

searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        toggleLoading(true);
        const weatherResponse: DailyWeather[] | null = await getCityWeather(handleInput());
        toggleLoading(false);
        setErrorMessage(weatherResponse);
        if (weatherResponse) {
            updateCurrentWeatherUI(weatherResponse);
            fetchWeeklyForecast(weatherResponse);
        }
    }
});

goIcon.addEventListener("click", async () => {
    toggleLoading(true);
    const weatherResponse: DailyWeather[] | null = await getCityWeather(handleInput());
    toggleLoading(false);
    setErrorMessage(weatherResponse);
    if (weatherResponse) {
        updateCurrentWeatherUI(weatherResponse);
        fetchWeeklyForecast(weatherResponse);
    }
});
