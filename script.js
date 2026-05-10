const apiKey = "YOUR_API_KEY";

async function getWeather() {

  const city = document.getElementById("city").value;

  if(city === "") {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {

    const response = await fetch(url);
    const data = await response.json();

    if(data.cod === "404") {
      alert("City not found");
      return;
    }

    document.getElementById("temp").innerHTML = `${Math.round(data.main.temp)}°C`;

    document.getElementById("city-name").innerHTML = data.name;

    document.getElementById("condition").innerHTML = data.weather[0].main;

    document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;

    document.getElementById("wind").innerHTML = `${data.wind.speed} km/h`;

    const iconCode = data.weather[0].icon;

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById("weather-icon").src = iconUrl;

  }

  catch(error) {
    alert("Something went wrong");
  }
}
