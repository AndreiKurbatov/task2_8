import { handleInput } from "./searchBar.js"
import { getCityWeather } from "./weatherManagement.js"
import WeatherResponse from "./WeatherResponse.js";
import { updateCurrentWeatherUI } from "./dataSetter.js";

const userInput : string = handleInput();
const weatherResponse : WeatherResponse | null = await getCityWeather(userInput);
updateCurrentWeatherUI(weatherResponse);

