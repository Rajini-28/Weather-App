// ===============================
// SKYCAST WEATHER APP - script.js
// ===============================

// 🔑 Replace this with your real OpenWeather API key
const apiKey = "YOUR_API_KEY_HERE";

// DOM Elements
const cityInput = document.getElementById("city");
const weatherBox = document.getElementById("weather");

// Get Weather Function
async function getWeather() {

  const city = cityInput.value.trim();

  // Empty input check
  if (city === "") {
    showMessage("⚠️ Please enter a city name");
    return;
  }

  // Loading UI
  weatherBox.innerHTML = `
    <div class="loading">
      <h2>Loading... ⏳</h2>
    </div>
  `;

  // API URL
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {

    const response = await fetch(url);

    // Invalid city or API error
    if (!response.ok) {
      throw new Error("Weather data not found");
    }

    const data = await response.json();

    // Weather details
    const temperature = Math.round(data.main.temp);
    const cityName = data.name;
    const country = data.sys.country;
    const condition = data.weather[0].main;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const feelsLike = Math.round(data.main.feels_like);
    const pressure = data.main.pressure;

    // Weather icon
    const iconCode = data.weather[0].icon;

    const iconUrl =
      `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    // Dynamic Background Change
    changeBackground(condition);

    // Display Weather
    weatherBox.innerHTML = `

      <div class="weather-main">

        <img src="${iconUrl}" alt="Weather Icon">

        <h1>${temperature}°C</h1>

        <h2>${cityName}, ${country}</h2>

        <h3>${condition}</h3>

        <p class="description">
          ${description}
        </p>

      </div>

      <div class="details">

        <div class="detail-box">
          <span>💧</span>
          <p>${humidity}%</p>
          <small>Humidity</small>
        </div>

        <div class="detail-box">
          <span>🌬️</span>
          <p>${windSpeed} km/h</p>
          <small>Wind Speed</small>
        </div>

      </div>

      <div class="details second-row">

        <div class="detail-box">
          <span>🌡️</span>
          <p>${feelsLike}°C</p>
          <small>Feels Like</small>
        </div>

        <div class="detail-box">
          <span>📊</span>
          <p>${pressure}</p>
          <small>Pressure</small>
        </div>

      </div>
    `;

  }

  catch (error) {

    console.log(error);

    showMessage("❌ City not found or API issue");

  }
}

// Enter key support
cityInput.addEventListener("keypress", function(event) {

  if(event.key === "Enter") {
    getWeather();
  }

});

// Error/Message UI
function showMessage(message) {

  weatherBox.innerHTML = `
    <div class="error-box">
      <h2>${message}</h2>
    </div>
  `;
}

// Dynamic Background
function changeBackground(condition) {

  const body = document.body;

  switch(condition.toLowerCase()) {

    case "clear":
      body.style.background =
      "linear-gradient(135deg,#f6d365,#fda085)";
      break;

    case "clouds":
      body.style.background =
      "linear-gradient(135deg,#bdc3c7,#2c3e50)";
      break;

    case "rain":
      body.style.background =
      "linear-gradient(135deg,#4b79a1,#283e51)";
      break;

    case "snow":
      body.style.background =
      "linear-gradient(135deg,#e6dada,#274046)";
      break;

    case "thunderstorm":
      body.style.background =
      "linear-gradient(135deg,#232526,#414345)";
      break;

    default:
      body.style.background =
      "linear-gradient(135deg,#4facfe,#00f2fe)";
  }
}

// Default Weather on Load
window.onload = () => {
  cityInput.value = "Hyderabad";
  getWeather();
};
