const apiKey = "11b96c8ab699377a169e179e145323f2";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const Weather = document.querySelector(".weather");

async function checkWeather(city) {
  //   Weather.style.innerHTML = `<h1> Loading...</h1>`;

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    // console.log(data);

    var sunrise = new Date(data.sys.sunrise * 1000);
    var sunset = new Date(data.sys.sunset * 1000);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".date").innerHTML = new Date().toDateString(
      data.dt
    );
    document.querySelector(".status").innerHTML = data.weather[0].main;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".sunrise").innerHTML = sunrise.toLocaleTimeString(
      "en-US",
      { hour: "2-digit", minute: "2-digit", hour12: true }
    );
    document.querySelector(".sunset").innerHTML = sunset.toLocaleTimeString(
      "en-US",
      { hour: "2-digit", minute: "2-digit", hour12: true }
    );

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main === "Sunny") {
      weatherIcon.src = "images/sunny.png";
    } else if (data.weather[0].main === "Smoke") {
      //   weatherIcon.src = "images/smoke.png";
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // get weather-icon from api database
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
