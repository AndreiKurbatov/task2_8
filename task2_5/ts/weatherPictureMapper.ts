import WeatherTypeConst from "./WeatherTypeConst.js";

const weatherImageRanges = [
    { rangeStart: WeatherTypeConst.THUNDERSTORM, rangeEnd: WeatherTypeConst.DRIZZLE, image: "./images/thunderstorm.png" },
    { rangeStart: WeatherTypeConst.DRIZZLE, rangeEnd: WeatherTypeConst.RAIN, image: "./images/drops.png" },
    { rangeStart: WeatherTypeConst.RAIN, rangeEnd: WeatherTypeConst.SNOW, image: "./images/rain.png" },
    { rangeStart: WeatherTypeConst.SNOW, rangeEnd: WeatherTypeConst.ATMOSPHERE, image: "./images/snow.png" },
    { rangeStart: WeatherTypeConst.ATMOSPHERE, rangeEnd: WeatherTypeConst.CLEAR, image: "./images/haze.png" },
    { rangeStart: WeatherTypeConst.CLEAR, rangeEnd: WeatherTypeConst.CLOUDS, image: "./images/sun.png" },
    { rangeStart: WeatherTypeConst.CLOUDS, rangeEnd: Infinity, image: "./images/cloud.png" },
];

export default function getWeatherPictureByWeatherCode(weatherCode: number): string {
    for (const { rangeStart, rangeEnd, image } of weatherImageRanges) {
        if (weatherCode >= rangeStart && weatherCode < rangeEnd) {
            return image;
        }
    }
    return "./images/zombie.png";
}