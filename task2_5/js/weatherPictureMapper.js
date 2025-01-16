import WeatherTypeEnum from "./WeatherTypeEnum.js";
export default function getWeatherPictureByWeatherId(weatherId) {
    if (weatherId >= WeatherTypeEnum.THUNDERSTORM && weatherId < WeatherTypeEnum.DRIZZLE) {
        return "./images/thunderstorm.png";
    }
    else if (weatherId >= WeatherTypeEnum.DRIZZLE && weatherId < WeatherTypeEnum.RAIN) {
        return "./images/drops/png";
    }
    else if (weatherId >= WeatherTypeEnum.RAIN && weatherId < WeatherTypeEnum.SNOW) {
        return "./images/rain.png";
    }
    else if (weatherId >= WeatherTypeEnum.SNOW && weatherId < WeatherTypeEnum.ATMOSPHERE) {
        return "./images/snow.png";
    }
    else if (weatherId >= WeatherTypeEnum.ATMOSPHERE && weatherId < WeatherTypeEnum.CLEAR) {
        return "./images/haze.png";
    }
    else if (weatherId >= WeatherTypeEnum.CLEAR && weatherId < WeatherTypeEnum.CLOUDS) {
        return "./images/sun.png";
    }
    else {
        return "./images/cloud.png";
    }
}
