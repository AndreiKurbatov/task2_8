export function updateCurrentWeatherUI(weatherData) {
    if (weatherData) {
        const currentTemperatureElement = document.getElementById("current-temperature");
        const currentNightWeatherElement = document.getElementById("current-night-weather");
        const currentNightTemperatureElement = document.getElementById("current-night-temperature");
        const currentZoneWeatherElement = document.getElementById("current-zone-weather");
        const currentZoneNameElement = document.getElementById("current-zone-name");
        currentTemperatureElement.innerHTML = `${weatherData[0].dayTemp}°C`;
        currentNightWeatherElement.textContent = weatherData[0].nightWeather;
        currentNightTemperatureElement.innerHTML = `${weatherData[0].nightTemp}°C`;
        currentZoneWeatherElement.textContent = weatherData[0].dayWeather;
        currentZoneNameElement.textContent = weatherData[0].cityName;
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
            dayName.textContent = weatherData[i].dayName;
            dayWeather.textContent = weatherData[i].dayWeather;
            dayWeatherTemperature.innerHTML = `${weatherData[i].dayTemp}°C`;
            nightWeatherTemperature.innerHTML = `${weatherData[i].nightTemp}°C`;
        }
    }
    else {
        console.log("Could not retrieve weather data.");
    }
}
