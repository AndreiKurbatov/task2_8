import WeatherResponse from './WeatherResponse';

export function updateCurrentWeatherUI(weatherData: WeatherResponse | null): void {
    if (weatherData) {
        const currentTemperatureElement = document.getElementById("current-temperature") as HTMLElement;
        const currentNightWeatherElement = document.getElementById("current-night-weather") as HTMLElement;
        const currentNightTemperatureElement = document.getElementById("current-night-temperature") as HTMLElement;
        const currentZoneWeatherElement = document.getElementById("current-zone-weather") as HTMLElement;
        const currentZoneNameElement = document.getElementById("current-zone-name") as HTMLElement;

        currentTemperatureElement.innerHTML = `${weatherData.currentTemp}°C`;
        currentNightWeatherElement.textContent = weatherData.nightWeather;
        currentNightTemperatureElement.innerHTML = `${weatherData.nightTemp}°C`;
        currentZoneWeatherElement.textContent = weatherData.currentWeather;
        currentZoneNameElement.textContent = weatherData.cityName;

    } else {
        console.log("Could not retrieve weather data.");
    }
}

