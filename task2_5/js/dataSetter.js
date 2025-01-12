export function updateCurrentWeatherUI(weatherData) {
    if (weatherData) {
        const currentTemperatureElement = document.getElementById("current-temperature");
        const currentNightWeatherElement = document.getElementById("current-night-weather");
        const currentNightTemperatureElement = document.getElementById("current-night-temperature");
        const currentZoneWeatherElement = document.getElementById("current-zone-weather");
        const currentZoneNameElement = document.getElementById("current-zone-name");
        currentTemperatureElement.innerHTML = `${weatherData.currentTemp}°C`;
        currentNightWeatherElement.textContent = weatherData.nightWeather;
        currentNightTemperatureElement.innerHTML = `${weatherData.nightTemp}°C`;
        currentZoneWeatherElement.textContent = weatherData.currentWeather;
        currentZoneNameElement.textContent = weatherData.cityName;
    }
    else {
        console.log("Could not retrieve weather data.");
    }
}
