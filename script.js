import { getWeather } from './fetchWeather.js';
import { generateMood } from './moodGenerator.js';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherMoodContainer = document.getElementById('weatherMoodContainer');
const cityNameElement = document.getElementById('cityName');
const temperatureElement = document.getElementById('temperature');
const conditionElement = document.getElementById('condition');
const humidityElement = document.getElementById('humidity');
const moodSuggestionElement = document.getElementById('moodSuggestion');

// Loading state management
function setLoading(isLoading) {
    getWeatherBtn.disabled = isLoading;
    getWeatherBtn.innerHTML = isLoading 
        ? '<svg class="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Loading...'
        : 'Get Weather';
}

// Error display
function showError(message) {
    weatherMoodContainer.classList.remove('hidden');
    weatherMoodContainer.innerHTML = `
        <div class="bg-red-50 border-l-4 border-red-400 p-4">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <div class="ml-3">
                    <p class="text-red-700">${message}</p>
                </div>
            </div>
        </div>
    `;
}

// Update UI with weather and mood data
function updateUI(weatherData, moodSuggestion) {
    // Reset container content if it was showing an error
    if (weatherMoodContainer.innerHTML.includes('bg-red-50')) {
        location.reload();
    }

    // Show the container with a fade effect
    weatherMoodContainer.classList.remove('hidden');
    weatherMoodContainer.classList.add('opacity-0');
    setTimeout(() => {
        weatherMoodContainer.classList.add('transition-opacity', 'duration-500', 'opacity-100');
    }, 50);

    // Update weather information
    cityNameElement.textContent = weatherData.cityName;
    temperatureElement.textContent = `${weatherData.temperature}°C`;
    conditionElement.textContent = weatherData.condition;
    humidityElement.textContent = `${weatherData.humidity}%`;

    // Update mood suggestion with a slight delay for a nice animation effect
    setTimeout(() => {
        moodSuggestionElement.textContent = moodSuggestion;
    }, 250);
}

// Handle the weather request
async function handleWeatherRequest() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    setLoading(true);

    try {
        // Get weather data
        const weatherData = await getWeather(city);
        
        // Generate mood based on weather condition
        const moodSuggestion = generateMood(weatherData.condition);
        
        // Update the UI
        updateUI(weatherData, moodSuggestion);
        
    } catch (error) {
        showError(error.message || 'Failed to fetch weather data. Please try again.');
    } finally {
        setLoading(false);
    }
}

// Event Listeners
getWeatherBtn.addEventListener('click', handleWeatherRequest);

// Allow Enter key to trigger weather request
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleWeatherRequest();
    }
}); 