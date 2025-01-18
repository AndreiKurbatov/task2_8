import DailyWeather from "./DailyWeather.js";

export function toDailyWeather(data : any) : DailyWeather[] {

    if (!data) {
        throw new Error("The data is not valid");
    }

    return data.daily.slice(0, 7).map((day: any, index: number) => {
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
            cityName: data.name,
            weatherIconId: day.weather[0].id,
        };
    });
}