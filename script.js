const apiKey = "ae7a0efe6571feed2fe8f62c0db5ae31";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("getWeather").addEventListener("click", getWeather);
});

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (city === "") {
    alert("⚠️ Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      document.querySelector(".celsius").textContent = `${data.main.temp}°C`;
      document.querySelector(".TR").textContent = `${data.main.temp}°C`;
      document.querySelector(".HR").textContent = `${data.main.humidity}%`;
      document.querySelector(".WR").textContent = `${data.wind.speed} m/s`;

      const iconCode = data.weather[0].icon;
      document.querySelector(".icon").innerHTML = `
        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="icon" />
      `;
    })
    .catch((error) => {
      alert("❌ City not found. Please check your spelling.");
      console.error("Error fetching weather:", error);
    });
}
