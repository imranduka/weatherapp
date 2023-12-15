// Function to fetch weather data from the OpenWeather API based on a city name
function fetchWeather(city) {
    // Constructing the API URL with the provided city name and API key
    const apiKey = 'f571eca027562a66c2bdd6a3d9e491d7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    // Making a fetch request to the API
    fetch(apiUrl)
        .then(response => {
            // Handling errors if the response is not OK
            if (!response.ok) {
                throw new Error('Invalid City');
            }
            return response.json(); // Parsing the response to JSON
        })
        .then(data => {
            // Once the data is received, update the weather UI
            updateWeather(data);
            clearErrorMessage(); // Clear any existing error message
        })
        .catch(error => {
            // If an error occurs during the fetch, display an error message
            displayErrorMessage(error.message);
        });
}

// Function to display an error message on the UI
function displayErrorMessage(message) {
    const errorMessage = document.querySelector('.error-message');
    const errorText = errorMessage.querySelector('.error-text');
    errorText.textContent = message;
    errorMessage.style.display = 'block'; // Show the error message element
}

// Function to clear the error message from the UI
function clearErrorMessage() {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.style.display = 'none'; // Hide the error message element
}

// Event listener for the search button
document.querySelector('.search-btn').addEventListener('click', function () {
    const cityName = document.querySelector('.city-name').value.trim();

    // Check if the input city name is empty
    if (cityName === '') {
        displayErrorMessage('Invalid City'); // Display an error if the city name is empty
    } else {
        fetchWeather(cityName); // Call the fetchWeather function with the provided city name
    }
});



// Function to update the weather UI based on the received data
function updateWeather(data) {
    // Extracting necessary data from the API response
    const cityName = data.city.name; // Get the city name from the data
    const weatherList = data.list; // Get the weather forecast list

    // Updating the city name display in the weather input section
    document.querySelector('.weather-input h3').textContent = cityName + ", " + data.city.country;

    // Selecting all weather cards to display the weather forecast
    const weatherCards = document.querySelectorAll('.weather-forecast .weather-card');

    // Mapping weather conditions to their respective icons
    const weatherIcons = {
        'Clear': 'wi_clear-day.svg',
        'Clouds': 'wi_cloudy.svg',
        'Rain': 'wi_rain.svg',
        'Snow': 'wi_snow.svg',
        'Thunderstorm': 'wi_thunderstorms-rain.svg',
        'PartlyCloudyDay': 'wi_partly-cloudy-day.svg',
        'PartlyCloudyNight': 'wi_partly-cloudy-night.svg',
        'ClearNight': 'wi_clear-night.svg'
        // Add more mappings for different weather conditions as needed
    };

    // Looping through the weather forecast list for the next 5 days (every 24 hours)
    for (let i = 0; i < 5; i++) {
        const dayInfo = weatherList[i * 8];
        const date = new Date(dayInfo.dt_txt);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
        const minTemp = Math.round(dayInfo.main.temp_min);
        const maxTemp = Math.round(dayInfo.main.temp_max);
        const description = dayInfo.weather[0].description;
        const condition = dayInfo.weather[0].main;

        const currentCard = weatherCards[i]; // Current weather card for a particular day

        // Update the weather card with the extracted data
        currentCard.querySelector('.date').textContent = dayOfWeek;
        currentCard.querySelector('img').src = `img/${weatherIcons[condition]}`;
        currentCard.querySelector('.temp .min-temp').textContent = `${minTemp} °F`;
        currentCard.querySelector('.temp .max-temp').textContent = `${maxTemp} °F`;
        currentCard.querySelector('.condition').textContent = description;
    }
}



// Default: Fetch weather for New York City
fetchWeather('New York');

// Event listener for the search button
document.querySelector('.search-btn').addEventListener('click', function () {
    const cityName = document.querySelector('.city-name').value.trim();

    if (cityName !== '') {
        fetchWeather(cityName);
    }
});
