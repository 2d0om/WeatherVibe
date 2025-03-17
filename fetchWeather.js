// Load API key from environment variable (in production)
// For development, you'll need to manually get it from .env file
const API_KEY = process.env.WEATHER_API_KEY || '';

/**
 * Fetches weather data for a given city
 * @param {string} city - The name of the city to get weather for
 * @returns {Promise<Object>} Weather data including city name, temperature, and condition
 * @throws {Error} If the city is not found or there's an API error
 */
export async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`City "${city}" not found`);
        }

        const data = await response.json();

        return {
            cityName: data.name,
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].main,
            humidity: data.main.humidity
        };
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
} 