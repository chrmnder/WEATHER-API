const API_KEY = "57515059ce2101a5953a36e6a283173b";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;

const searchForm = document.getElementById("searchForm"); // to listen for user input.
const searchInput = document.getElementById("searchInput"); // Selects the input field where the user types a city name.
const weatherResult = document.getElementById("weatherResult"); //Selects the section where the weather details are displayed.

const cityName = document.getElementById("city").querySelector("figcaption"); //Selects the text area where the city name is displayed.
const cityFlag = document.getElementById("city").querySelector("img"); //Selects the image where the country flag is displayed.

const tempIcon = document.getElementById("temperature").querySelector("img"); //Selects the weather icon image.
const tempValue = document.getElementById("temperature").querySelector("figcaption span"); //Selects the temperature value to update it dynamically.

const description = document.getElementById("description"); //Selects the weather description
const clouds = document.getElementById("clouds"); //Selects the cloud percentage value.
const humidity = document.getElementById("humidity"); //Selects the humidity value.
const windSpeed = document.getElementById("wind-speed"); //Selects the wind speed value.

// Fetch weather data from API
const fetchWeather = async (city) => {
    try {
        const response = await fetch(`${API_URL}&q=${city}`);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found. Please try again.");
            return;
        }

        updateUI(data);
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

// Update UI with fetched data
const updateUI = (data) => {
    cityName.textContent = data.name; //Displays the city name
    cityFlag.src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`; //Shows the country’s flag

    tempIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`; // Displays the weather icon
    tempValue.textContent = data.main.temp; //Shows the temperature in °C.

    description.textContent = data.weather[0].description; //Displays a short text description of the weather
    clouds.textContent = data.clouds.all; //Shows the percentage of cloud cover
    humidity.textContent = data.main.humidity; //Shows the humidity percentage.
    windSpeed.textContent = (data.wind.speed * 3.6).toFixed(1); // Shows wind speed Convert m/s to km/h

    weatherResult.classList.remove("hidden"); // Show the weather result section
};


// Event listener for search form
searchForm.addEventListener("submit", (event) => { //waits for the user to submit the form 
    event.preventDefault(); // handle submission without reloading page
    const city = searchInput.value.trim(); //removes extra spaces
    if (city) {
        fetchWeather(city);
        searchInput.value = ""; // Clear input field after search
    }
});
