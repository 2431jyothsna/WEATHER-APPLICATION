const API_KEY = "dfdfed83fdcb5c6d24da3267f237679a"; // Replace with your own API key

function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    document.getElementById("weatherResult").innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      const weatherDiv = document.getElementById("weatherResult");

      weatherDiv.innerHTML = `
        <img src="${iconUrl}" alt="${data.weather[0].main}" />
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].main}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;

      // Restart animation
      weatherDiv.style.animation = 'none';
      void weatherDiv.offsetWidth;
      weatherDiv.style.animation = 'fadeIn 1s ease-in-out';
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = "<p>City not found!</p>";
    });
}
