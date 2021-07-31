function showCurrentTemp(response) {
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  tempValue.innerHTML = `${temperature}`;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusValue = response.data.main.temp;

  getForecast(response.data.coord);
}
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2e34988ca373caa2c3b40b6fa2e011c2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemp);
}
navigator.geolocation.getCurrentPosition(currentPosition);

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  tempValue.innerHTML = `${temperature}`;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusValue = response.data.main.temp;

  getForecast(response.data.coord);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "2e34988ca373caa2c3b40b6fa2e011c2";
  let city = `${searchInput.value}`;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
let h1 = document.querySelector("h1");
let tempValue = document.querySelector(".tempValue");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let description = document.querySelector("#description");
let icon = document.querySelector("#icon");
let now = new Date();
let dateTime = document.querySelector(".dateTime");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
dateTime.innerHTML = `${day}, ${month} ${date} ${year}, ${hours}:${minutes}`;

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp-value");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusValue * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp-value");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusValue);
}
let celsiusValue = null;

let fahrenheitLink = document.querySelector("#fahrenheit-value");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-value");
celsiusLink.addEventListener("click", displayCelsiusTemp);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="days">
      <p>
        ${formatDay(forecastDay.dt)}
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
      </p>
  </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2e34988ca373caa2c3b40b6fa2e011c2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
