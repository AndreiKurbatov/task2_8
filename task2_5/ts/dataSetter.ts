import DailyWeather from './DailyWeather.js';
import getWeatherPictureByWeatherId from './weatherPictureMapper.js';

export function updateCurrentWeatherUI(weatherData: DailyWeather[] | null): void {
    if (weatherData) {
        const currentTemperatureElement = document.getElementById("current-temperature") as HTMLElement;
        const currentNightWeatherElement = document.getElementById("current-night-weather") as HTMLElement;
        const currentNightTemperatureElement = document.getElementById("current-night-temperature") as HTMLElement;
        const currentZoneWeatherElement = document.getElementById("current-zone-weather") as HTMLElement;
        const currentZoneNameElement = document.getElementById("current-zone-name") as HTMLElement;
        const currentWeatherIcon = document.getElementById("current-weather-icon") as HTMLImageElement;
        const selectedZone = document.getElementById("selected-zone") as HTMLElement;

        currentTemperatureElement.innerHTML = `${weatherData[0].dayTemp}°C`;
        currentNightWeatherElement.textContent = weatherData[0].nightWeather;
        currentNightTemperatureElement.innerHTML = `${weatherData[0].nightTemp}°C`;
        currentZoneWeatherElement.textContent = weatherData[0].dayWeather;
        currentZoneNameElement.textContent = weatherData[0].cityName;
        selectedZone.textContent = "Selected: " + weatherData[0].cityName;
        currentWeatherIcon.src = getWeatherPictureByWeatherId(weatherData[0].weatherIconId);
    } else {
        console.log("Could not retrieve weather data.");
    }
}

export function fetchWeeklyForecast(weatherData: DailyWeather[] | null): void {
    if (weatherData) {
        for (let i = 1; i < 7; i++) {
            const dayName = document.getElementById(`day-name${i}`) as HTMLElement;
            const dayWeather = document.getElementById(`day-weather${i}`) as HTMLElement;
            const dayWeatherTemperature = document.getElementById(`day-weather-temperature${i}`) as HTMLElement;
            const nightWeatherTemperature = document.getElementById(`night-weather-temperature${i}`) as HTMLElement;
            const currentWeatherIcon = document.getElementById(`day-weather-icon${i}`) as HTMLImageElement;

            dayName.textContent = weatherData[i].dayName.substring(0, 3).toUpperCase();
            dayWeather.textContent = weatherData[i].dayWeather;
            dayWeatherTemperature.innerHTML = `${weatherData[i].dayTemp}°C`;
            nightWeatherTemperature.innerHTML = `${weatherData[i].nightTemp}°C`;
            currentWeatherIcon.src = getWeatherPictureByWeatherId(weatherData[i].weatherIconId);
        }
    } else {
        console.log("Could not retrieve weather data.");
    }
}

export function toggleLoading(isLoading: boolean): void {
    const loader = document.querySelector(".loader") as HTMLElement;
    const currentTemperatureContainer = document.querySelector(".current-temperature-container") as HTMLElement;
    const currentZoneInfoContainer = document.querySelector(".current-zone-info-container") as HTMLElement;
    const currentWeatherIcon = document.getElementById("current-weather-icon") as HTMLElement;
    const currentWeatherContainer = document.getElementById("current-weather-container") as HTMLElement;
    const weekWeatherContainer = document.getElementById("week-weather-container") as HTMLElement;
    const selectedZone = document.getElementById("selected-zone") as HTMLElement;

    if (isLoading) {
        loader.style.display = "block";
        currentTemperatureContainer.style.display = "none";
        currentZoneInfoContainer.style.display = "none";
        currentWeatherIcon.style.display = "none";
        weekWeatherContainer.style.display = "none";
        currentWeatherContainer.style.justifyContent = "center";
        selectedZone.textContent = "Selected: ...";
    } else {
        loader.style.display = "none";
        currentTemperatureContainer.style.display = "flex";
        currentZoneInfoContainer.style.display = "flex";
        weekWeatherContainer.style.display = "flex";
        currentWeatherIcon.style.display = "block";
        currentWeatherContainer.style.justifyContent = "space-between";
    }
}

export function setErrorMessage(weatherResponse: DailyWeather[] | null) {
    const currentTemperatureContainer = document.querySelector(".current-temperature-container") as HTMLElement;
    const currentZoneInfoContainer = document.querySelector(".current-zone-info-container") as HTMLElement;
    const currentWeatherIcon = document.getElementById("current-weather-icon") as HTMLElement;
    const currentWeatherContainer = document.getElementById("current-weather-container") as HTMLElement;
    const weekWeatherContainer = document.getElementById("week-weather-container") as HTMLElement;
    const locationError = document.getElementById("location-error") as HTMLElement;
    const selectedZone = document.getElementById("selected-zone") as HTMLElement;

    if (weatherResponse == null) {
        locationError.style.display = "block";
        weekWeatherContainer.style.display = "none";
        currentTemperatureContainer.style.display = "none";
        currentZoneInfoContainer.style.display = "none";
        currentWeatherIcon.style.display = "none";
        currentWeatherContainer.style.justifyContent = "center";
        selectedZone.textContent = "Selected: ...";
    } else {
        locationError.style.display = "none";
    }
}



