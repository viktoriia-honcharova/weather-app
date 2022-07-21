//Show date
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hours}:${minutes}`;

  return `${day}, ${time}`;
}

let now = new Date();
let dateTime = document.querySelector(".day-time");

dateTime.innerHTML = formatDate(now);

//Show data
/*function displayWeather(responce) {
  let cityName = document.querySelector("#city-name");
  let cityNameValue = responce.data.name;
  cityName.innerHTML = cityNameValue;

  let currentTemp = document.querySelector("#current-temp");
  let currentTempValue = Math.round(responce.data.main.temp);
  currentTemp.innerHTML = currentTempValue;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = responce.data.main.humidity;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(responce.data.wind.speed);

  console.log(responce);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
  let apiKey = "7b520c6d96772777c0b1b903686b2ce1";
  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(displayWeather);
}

function changeData(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input");
  let city = cityInput.value;

  searchCity(city);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", changeData);

//Current location button
function showPositionAndWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  let apiKey = "7b520c6d96772777c0b1b903686b2ce1";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPositionAndWeather);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);

searchCity("Kyiv");*/

function displayTemperature(responce) {
  console.log(responce.data);
  let temp = Math.round(responce.data.main.temp);
  document.querySelector("#current-temp").innerHTML = temp;
  let city = responce.data.name;
  document.querySelector("#city-name").innerHTML = city;
  let humidity = responce.data.main.humidity;
  document.querySelector("#humidity").innerHTML = humidity;
  let wind = Math.round(responce.data.wind.speed);
  document.querySelector("#wind-speed").innerHTML = wind;
}

let apiKey = "7b520c6d96772777c0b1b903686b2ce1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rivne&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
