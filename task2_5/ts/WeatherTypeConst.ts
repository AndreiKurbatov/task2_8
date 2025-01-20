const WeatherTypeConst = {
    THUNDERSTORM: 200,
    DRIZZLE: 300,
    RAIN: 500,
    SNOW: 600,
    ATMOSPHERE: 700,
    CLEAR: 800,
    CLOUDS: 801
} as const;

export type WeatherType = typeof WeatherTypeConst[keyof typeof WeatherTypeConst];
export default WeatherTypeConst;