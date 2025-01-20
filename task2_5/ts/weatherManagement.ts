import DailyWeather from "./DailyWeather.js"
import { toDailyWeather } from "./responseMap.js"

export async function getCityWeather(cityName: string): Promise<DailyWeather[] | null> {

    let response: Response;
    let apiUrl: string;

    if (!cityName || cityName.trim() === "") {
        const userPosition = await getUserPosition();
        apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${userPosition.lat}&lon=${userPosition.lon}&limit=1&appid=${import.meta.env.VITE_API_KEY}`;
    } else {
        apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${import.meta.env.VITE_API_KEY}`;
    }

    try {
        response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        if (data.length === 0) {
            return null;
        }

        return await fetchWeeklyForecast(data[0]);
    } catch (error) {
        return null;
    }
}

async function fetchWeeklyForecast(location: any): Promise<DailyWeather[] | null> {
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current,minutely,alerts&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

    try {
        const response: Response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        const dailyWeathers : DailyWeather[] =  toDailyWeather(data);
        for (const weather of dailyWeathers) {
            weather.cityName = location.name;
        }
        return dailyWeathers;
    } catch (error) {
        return null;
    }
}



async function getUserPosition(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser."));
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude: lat, longitude: lon } = position.coords;
                resolve({ lat, lon });
            },
            (error) => {
                reject(new Error(`Geolocation error: ${error.message}`));
            }
        );
    });
}