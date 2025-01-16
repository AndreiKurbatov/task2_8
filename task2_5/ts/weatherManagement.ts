import DailyWeather from "./DailyWeather.js"
//import dotenv from "dotenv";

export async function getCityWeather(cityName: string): Promise<DailyWeather[] | null> {
    const apiKey: string = "08e9e3b150d3d7e4d46a0042a24d3989"; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

    let location;
    try {
        if (!cityName || cityName.trim() === "") {
            console.log("City name is empty. Fetching user's current location...");
            const userPosition = await getUserPosition();
            console.log("The user current location: lat: " + userPosition.lat + " and lon: " + userPosition.lon);

            console.log("Try to get location name by the coordinates");
            const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${userPosition.lat}&lon=${userPosition.lon}&limit=1&appid=${apiKey}`;
            console.log("Fetching the city by the coordinates...");
            const response: Response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            if (data.length === 0) {
                console.error("No location found for the provided coordinates.");
                return null;
            }

            location = data[0];

            console.log(`City found: ${location.name}, Lat: ${location.lat}, Lon: ${location.lon}`);
        } else {
            const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
            console.log("Fetching city coordinates...");
            const response: Response = await fetch(geoApiUrl);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            if (data.length === 0) {
                console.error("No location found for the provided coordinates.");
                return null;
            }

            location = data[0];

            console.log(`City found: ${location.name}, Lat: ${location.lat}, Lon: ${location.lon}`);
        }
        return await fetchWeeklyForecast(location.lat, location.lon, location.name);
    } catch (error) {
        console.error("Error during API call:", (error as Error).message);
        return null;
    }
}

async function fetchWeeklyForecast(lat: number, lon: number, cityName: string): Promise<DailyWeather[] | null> {
    const apiKey: string = "08e9e3b150d3d7e4d46a0042a24d3989";
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=metric&appid=${apiKey}`;

    try {
        console.log("Fetching weekly weather forecast...");
        const response: Response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        const forecast = data.daily.slice(0, 7).map((day: any, index: number) => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

            let nightWeather = "No info";
            if (index === 0) {
                const hourlyData = data.hourly.filter((hour: any) => {
                    const hourDate = new Date(hour.dt * 1000);
                    return (
                        hourDate.getUTCDate() === date.getUTCDate() &&
                        (hourDate.getUTCHours() >= 18 || hourDate.getUTCHours() < 6)
                    );
                });

                nightWeather = hourlyData.map((hour: any) => hour.weather[0].description)[0] || "No info";
            }

            return {
                dayName: dayName,
                dayWeather: day.weather[0].description,
                dayTemp: Math.round(day.temp.day),
                nightTemp: Math.round(day.temp.night),
                nightWeather: nightWeather,
                cityName: cityName,
                weatherIconId: day.weather[0].id,
            };
        });

        console.log("Forecast data fetched successfully.");
        return forecast;
    } catch (error) {
        console.error("Error while fetching weekly forecast:", (error as Error).message);
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