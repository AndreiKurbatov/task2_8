export async function getCityWeather(cityName) {
    const apiKey = "08e9e3b150d3d7e4d46a0042a24d3989"; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    let location;
    try {
        if (!cityName || cityName.trim() === "") {
            console.log("City name is empty. Fetching user's current location...");
            const userPosition = await getUserPosition();
            console.log("The user current location: lat: " + userPosition.lat + " and lon: " + userPosition.lon);
            console.log("Try to get location name by the coordinates");
            const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${userPosition.lat}&lon=${userPosition.lon}&limit=1&appid=${apiKey}`;
            console.log("Fetching the city by the coordinates...");
            const response = await fetch(apiUrl);
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
        else {
            const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
            console.log("Fetching city coordinates...");
            const response = await fetch(geoApiUrl);
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
    }
    catch (error) {
        console.error("Error during API call:", error.message);
        return null;
    }
}
async function fetchWeeklyForecast(lat, lon, cityName) {
    const apiKey = "08e9e3b150d3d7e4d46a0042a24d3989";
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;
    try {
        console.log("Fetching weekly weather forecast...");
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        const forecast = data.daily.slice(0, 7).map((day) => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
            return {
                dayName,
                dayWeather: day.weather[0].description,
                dayTemp: Math.round(day.temp.day),
                nightTemp: Math.round(day.temp.night),
                nightWeather: day.weather[0].description,
                cityName
            };
        });
        console.log("Forecast data fetched successfully.");
        return forecast;
    }
    catch (error) {
        console.error("Error while fetching weekly forecast:", error.message);
        return null;
    }
}
async function getUserPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser."));
        }
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude: lat, longitude: lon } = position.coords;
            resolve({ lat, lon });
        }, (error) => {
            reject(new Error(`Geolocation error: ${error.message}`));
        });
    });
}
