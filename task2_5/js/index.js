import { handleInput } from "./searchBar.js";
import { getCityWeather } from "./weatherManagement.js";
import { updateCurrentWeatherUI } from "./dataSetter.js";
const userInput = handleInput();
const weatherResponse = await getCityWeather(userInput);
updateCurrentWeatherUI(weatherResponse);
