import DailyWeather from './DailyWeather';

export function updateCurrentWeatherUI(weatherData: DailyWeather[] | null): void {
    if (weatherData) {
        const currentTemperatureElement = document.getElementById("current-temperature") as HTMLElement;
        const currentNightWeatherElement = document.getElementById("current-night-weather") as HTMLElement;
        const currentNightTemperatureElement = document.getElementById("current-night-temperature") as HTMLElement;
        const currentZoneWeatherElement = document.getElementById("current-zone-weather") as HTMLElement;
        const currentZoneNameElement = document.getElementById("current-zone-name") as HTMLElement;

        currentTemperatureElement.innerHTML = `${weatherData[0].dayTemp}°C`;
        currentNightWeatherElement.textContent = weatherData[0].nightWeather;
        currentNightTemperatureElement.innerHTML = `${weatherData[0].nightTemp}°C`;
        currentZoneWeatherElement.textContent = weatherData[0].dayWeather;
        currentZoneNameElement.textContent = weatherData[0].cityName;

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

            dayName.textContent = weatherData[i].dayName;
            dayWeather.textContent = weatherData[i].dayWeather;
            dayWeatherTemperature.innerHTML = `${weatherData[i].dayTemp}°C`;
            nightWeatherTemperature.innerHTML = `${weatherData[i].nightTemp}°C`;
        }
    } else {
        console.log("Could not retrieve weather data.");
    }
}



