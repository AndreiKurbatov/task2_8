import getWeatherPictureByWeatherId from './weatherPictureMapper.js';
export function updateCurrentWeatherUI(weatherData) {
    if (weatherData) {
        const currentTemperatureElement = document.getElementById("current-temperature");
        const currentNightWeatherElement = document.getElementById("current-night-weather");
        const currentNightTemperatureElement = document.getElementById("current-night-temperature");
        const currentZoneWeatherElement = document.getElementById("current-zone-weather");
        const currentZoneNameElement = document.getElementById("current-zone-name");
        const currentWeatherIcon = document.getElementById("current-weather-icon");
        const selectedZone = document.getElementById("selected-zone");
        currentTemperatureElement.innerHTML = `${weatherData[0].dayTemp}°C`;
        currentNightWeatherElement.textContent = weatherData[0].nightWeather;
        currentNightTemperatureElement.innerHTML = `${weatherData[0].nightTemp}°C`;
        currentZoneWeatherElement.textContent = weatherData[0].dayWeather;
        currentZoneNameElement.textContent = weatherData[0].cityName;
        selectedZone.textContent = "Selected: " + weatherData[0].cityName;
        currentWeatherIcon.src = getWeatherPictureByWeatherId(weatherData[0].weatherIconId);
    }
    else {
        console.log("Could not retrieve weather data.");
    }
}
export function fetchWeeklyForecast(weatherData) {
    if (weatherData) {
        for (let i = 1; i < 7; i++) {
            const dayName = document.getElementById(`day-name${i}`);
            const dayWeather = document.getElementById(`day-weather${i}`);
            const dayWeatherTemperature = document.getElementById(`day-weather-temperature${i}`);
            const nightWeatherTemperature = document.getElementById(`night-weather-temperature${i}`);
            const currentWeatherIcon = document.getElementById(`day-weather-icon${i}`);
            dayName.textContent = weatherData[i].dayName.substring(0, 3).toUpperCase();
            dayWeather.textContent = weatherData[i].dayWeather;
            dayWeatherTemperature.innerHTML = `${weatherData[i].dayTemp}°C`;
            nightWeatherTemperature.innerHTML = `${weatherData[i].nightTemp}°C`;
            currentWeatherIcon.src = getWeatherPictureByWeatherId(weatherData[i].weatherIconId);
        }
    }
    else {
        console.log("Could not retrieve weather data.");
    }
}
export function toggleLoading(isLoading) {
    const loader = document.querySelector(".loader");
    const currentTemperatureContainer = document.querySelector(".current-temperature-container");
    const currentZoneInfoContainer = document.querySelector(".current-zone-info-container");
    const currentWeatherIcon = document.getElementById("current-weather-icon");
    const currentWeatherContainer = document.getElementById("current-weather-container");
    const weekWeatherContainer = document.getElementById("week-weather-container");
    const selectedZone = document.getElementById("selected-zone");
    if (isLoading) {
        loader.style.display = "block";
        currentTemperatureContainer.style.display = "none";
        currentZoneInfoContainer.style.display = "none";
        currentWeatherIcon.style.display = "none";
        weekWeatherContainer.style.display = "none";
        currentWeatherContainer.style.justifyContent = "center";
        selectedZone.textContent = "Selected: ...";
    }
    else {
        loader.style.display = "none";
        currentTemperatureContainer.style.display = "flex";
        currentZoneInfoContainer.style.display = "flex";
        weekWeatherContainer.style.display = "flex";
        currentWeatherIcon.style.display = "block";
        currentWeatherContainer.style.justifyContent = "space-between";
    }
}
export function setErrorMessage(weatherResponse) {
    const currentTemperatureContainer = document.querySelector(".current-temperature-container");
    const currentZoneInfoContainer = document.querySelector(".current-zone-info-container");
    const currentWeatherIcon = document.getElementById("current-weather-icon");
    const currentWeatherContainer = document.getElementById("current-weather-container");
    const weekWeatherContainer = document.getElementById("week-weather-container");
    const locationError = document.getElementById("location-error");
    const selectedZone = document.getElementById("selected-zone");
    if (weatherResponse == null) {
        locationError.style.display = "block";
        weekWeatherContainer.style.display = "none";
        currentTemperatureContainer.style.display = "none";
        currentZoneInfoContainer.style.display = "none";
        currentWeatherIcon.style.display = "none";
        currentWeatherContainer.style.justifyContent = "center";
        selectedZone.textContent = "Selected: ...";
    }
    else {
        locationError.style.display = "none";
    }
}
