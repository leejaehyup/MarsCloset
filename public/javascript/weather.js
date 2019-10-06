const API_KEY = "1c89f92aa0ecb4258a562c9e5ed65022"; //ajax로 서버 요청해서 가져오기..
const COORDS = "coords";
//const weatherspan = document.querySelector(".weather-js");
function getWeather(lat, lng) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lng +
      "&appid=" +
      API_KEY +
      "&units=metric"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      const temperature = json.main.temp; //온도

      const location = json.name; //장소
      const weatherImage = document.getElementById("weather-Image");
      const weatherIcon = json.weather[0].icon; //아이콘
      weatherImage.src =
        "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      const weatherspan = document.querySelector(".weather-js");
      const weathertemp = document.querySelector(".temp");
      weathertemp.innerText = temperature + "℃";
      weatherspan.innerText = "서울시 구로구";
      weatherspan.innerText = location;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function getSucessPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function getFailPosition() {
  console.log("fail the lotation data");
}

function askCoords() {
  navigator.geolocation.getCurrentPosition(getSucessPosition, getFailPosition);
}

function load() {
  const loadCoords = localStorage.getItem(COORDS);

  if (loadCoords === null) {
    askCoords();
  } else {
    const parseCoords = JSON.parse(loadCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  load();
}
init();
