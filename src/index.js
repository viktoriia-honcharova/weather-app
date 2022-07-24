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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDate()];

  return day;
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);

  let dateNumb = date.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  return `${dateNumb} ${month}`;
}

function displayForecast(responce) {
  let forecast = responce.data.daily;
  let forecastElement = document.querySelector("#forecast");

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastElement.innerHTML += `<div class="row days">
            <div class="col-sm-6">
              <p class="day-title">${formatDay(forecastDay.dt)}</p>
              <p class="day-value">${formatForecastDate(forecastDay.dt)}</p>
            </div>
            <div class="col-sm-6">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" class="prediction-img" />
              <p class="prediction-temp">
                ${Math.round(
                  forecastDay.temp.max
                )}° <span class="temp-night"> ${Math.round(
        forecastDay.temp.min
      )}°</span>
              </p>
            </div>
          </div>`;
    }
  });
}

function getForecast(coordinates) {
  let apiKey = "7b520c6d96772777c0b1b903686b2ce1";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(responce) {
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

  let icon = `http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`;
  document
    .querySelector("#currennt-weather-icon")
    .setAttribute("src", `${icon}`);

  getForecast(responce.data.coord);
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

let cityForm = document.querySelector("#search-form");
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
  document.querySelector("#input").value = "";
  navigator.geolocation.getCurrentPosition(showPositionAndWeather);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);

searchCity("Kyiv");
