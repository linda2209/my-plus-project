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

//function changeFahrenheit() {
//  let temperature = document.querySelector(".tempValue");
//  temperature.innerHTML = 75;
//}
//let fahrenheit = document.querySelector("#fahrenheit-value");
//fahrenheit.addEventListener("click", changeFahrenheit);
//function changeCelsius() {
//  let temperature = document.querySelector(".tempValue");
//  temperature.innerHTML = 35;
//}
//let celsius = document.querySelector("#celsius-value");
//celsius.addEventListener("click", changeCelsius);
