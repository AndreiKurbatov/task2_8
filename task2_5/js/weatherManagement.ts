import WeatherResponse from './WeatherResponse';

export async function getCityWeather(cityName: string): Promise<WeatherResponse | null> {
    const apiKey: string = "08e9e3b150d3d7e4d46a0042a24d3989"; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    try {
        let geoResponse: GeoResponse;

        if (!cityName || cityName.trim() === "") {
            console.log("City name is empty. Fetching user's current location...");
            const userPosition = await getUserPosition();
            geoResponse = {
                name: "Your location",
                lat: userPosition.lat,
                lon: userPosition.lon,
                country: "Your country"
            };
            console.log("The user current location: lat: " + userPosition.lat + " and lon: " + userPosition.lon);
            console.log("Try to get location name by coordinates");
            const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${geoResponse.lat}&lon=${geoResponse.lon}&limit=1&appid=${apiKey}`;

            const response: Response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            if (data.length === 0) {
                console.error("No location found for the provided coordinates.");
                return null;
            }

            geoResponse.name = data[0].name;
            console.log("The location is " + geoResponse.name);

        } else {
            console.log("Fetching city coordinates...");
            const response: Response = await fetch(geoApiUrl);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const geoData: GeoResponse[] = await response.json();
            if (geoData.length === 0) {
                console.error("City not found.");
                return null;
            }

            const { lat, lon, name } = geoData[0];
            console.log(`City found: ${name}, Lat: ${lat}, Lon: ${lon}`);

            geoResponse = geoData[0];
        }
        return await fetchWeather(geoResponse);
    } catch (error) {
        console.error("Error during API call:", (error as Error).message);
        return null;
    }
}

async function fetchWeather(geoResponse: GeoResponse): Promise<WeatherResponse | null> {
    const apiKey: string = "08e9e3b150d3d7e4d46a0042a24d3989"; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${geoResponse.lat}&lon=${geoResponse.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;

    try {
        console.log("Fetching weather data...");
        const response: Response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        const currentTemp: number = Math.round(data.current.temp);
        const currentWeather: string = data.current.weather[0].description;
        const nightTemp: number = Math.round(data.daily[0].temp.night);
        const nightWeather: string = data.daily[0].weather[0].description;
        const cityName : string = geoResponse.name;

        console.log("Weather data fetched successfully.");
        return {
            currentTemp,
            currentWeather,
            nightTemp,
            nightWeather,
            cityName
        };
    } catch (error) {
        console.error("Error while fetching weather data:", (error as Error).message);
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