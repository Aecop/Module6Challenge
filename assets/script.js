// Function will run once html is fully loaded.
$(function () {
  // Global variables
  let cityInput = $("#city-input");
  let btnEle = $("#btn");
  let fiveWeather = $("#fiveWeather");
  let weatherDiv = $("#weather-display");
  let userParam = cityInput.val();
  let currentWeather = $("#current-weather");
  let currTemp = $("#curr-temp");
  let currWeather = $("#curr-weather");
  let currHumid = $("#curr-humidity");
  let container = $("#container");
  let searchHistory = $("#search-history");
  let clearSearch = $("#clearHistory");

  let lan = ""
  let lon = ""

  let retriveJson = JSON.parse(localStorage.getItem("dkey")) || [];

  // IMG address
  let cloudsIcon = "https://img.icons8.com/dotty/512/clouds.png";
  let rainIcon = "https://img.icons8.com/dotty/512/heavy-rain.png";
  let sunnyIcon = "https://img.icons8.com/dotty/512/sun.png";
  let thunderIcon = "https://img.icons8.com/dotty/512/storm.png";
  let snowIcon = "https://img.icons8.com/dotty/512/snow.png";

  //API PARAMS
  let requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
  let param1 = "&limit=5&appid=a763be4befc9d6fd3981fb3420b2dcb0";
  let completeApi = requestUrl + userParam + param1;
  let weatherurl = "https://api.openweathermap.org/data/2.5/forecast?lat=";
  let weatherurl2 = "&lon=";
  let weatherurl3 = "&units=imperial&appid=a763be4befc9d6fd3981fb3420b2dcb0";

  // Fetching API to get data by location name
  function getApi(completeApi) {
    // This will empty inside element when api is called to prevent duplicates display
    fiveWeather.empty();
    currTemp.empty();
    currWeather.empty();
    currHumid.empty();
    container.empty();
    searchHistory.empty();

    fetch(completeApi, {
      method: "GET",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Declaring var to use it for nested API to grab weather information by adding lat and lon from the first API
        let lat = data[0].lat;
        let latString = lat.toString();
        let lon = data[0].lon;
        let longString = lon.toString();
        let completeApi2 =
          weatherurl + latString + weatherurl2 + longString + weatherurl3;

        // Nested API using data from first fetch above to grab lan and lon to grab weather information
        fetch(completeApi2, {
          method: "GET",
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (info) {
            //assigning var to information that is needed for appending to html
            let weather = info.list[0].weather[0].main;
            let temperture = info.list[0].main.temp;
            let humidity = info.list[0].main.humidity;

            // appending variables to the weather display
            currWeather.append("Today Weather Is: " + weather);
            currTemp.append("Current Temperture Is: " + temperture + " °F");
            currHumid.append("Humidity Today is: " + humidity + "%");

            // If condition to check the weather data and append img src of correct img to display on html
            if (weather === "Clouds") {
              $(document).ready(function () {
                $(
                  `<img src='${cloudsIcon}' style="height: 50px; width: 50px;">`
                ).appendTo(container);
              });
            } else if (weather === "Rain") {
              $(document).ready(function () {
                $(
                  `<img src='${rainIcon}'style="height: 50px; width: 50px; ">`
                ).appendTo(container);
              });
            } else if (weather === "Clear") {
              $(document).ready(function () {
                $(
                  `<img src='${sunnyIcon}' style="height: 50px; width: 50px;">`
                ).appendTo(container);
              });
            } else if (weather === "Thunderstorm") {
              $(document).ready(function () {
                $(
                  `<img src='${thunderIcon}' style="height: 50px; width: 50px;">`
                ).appendTo(container);
              });
            } else {
              $(document).ready(function () {
                $(
                  `<img src='${snowIcon}' style="height: 50px; width: 50px;">`
                ).appendTo(container);
              });
            }

            // Display 5 days weather forecast of the city using For loops to grab data by var i
            for (var i = 0; i < 5; i++) {
              let fiveDayWeather = info.list[i + 1].weather[0].main;
              let fiveDayTemp = info.list[i + 1].main.temp;
              let fiveDayHumid = info.list[i + 1].main.humidity;
              let fiveWeatherDiv = document.createElement("div");
              let fiveWeatherUlEle = document.createElement("ul");
              let fiveWeatherLiEle = document.createElement("li");
              fiveWeatherLiEle.append("Weather: " + fiveDayWeather + "   | ");
              fiveWeatherLiEle.append("Temperture: " + fiveDayTemp + "°F  | ");
              fiveWeatherLiEle.append("Humidity: " + fiveDayHumid + "   %");
              fiveWeatherUlEle.append(fiveWeatherLiEle);
              fiveWeatherDiv.append(fiveWeatherUlEle);
              fiveWeather.append(fiveWeatherDiv);

              // Display image of each day of the weather
              if (fiveDayWeather === "Clouds") {
                $(document).ready(function () {
                  $(
                    `<img src='${cloudsIcon}' style="height: 50px; width: 50px;">`
                  ).appendTo(fiveWeatherDiv);
                });
              } else if (fiveDayWeather === "Rain") {
                $(document).ready(function () {
                  $(
                    `<img src='${rainIcon}'style="height: 50px; width: 50px; ">`
                  ).appendTo(fiveWeatherDiv);
                });
              } else if (fiveDayWeather === "Clear") {
                $(document).ready(function () {
                  $(
                    `<img src='${sunnyIcon}' style="height: 50px; width: 50px;">`
                  ).appendTo(fiveWeatherDiv);
                });
              } else if (fiveDayWeather === "Thunderstorm") {
                $(document).ready(function () {
                  $(
                    `<img src='${thunderIcon}' style="height: 50px; width: 50px;">`
                  ).appendTo(fiveWeatherDiv);
                });
              } else {
                $(document).ready(function () {
                  $(
                    `<img src='${snowIcon}' style="height: 50px; width: 50px;">`
                  ).appendTo(fiveWeatherDiv);
                });
              }
            }
          });
      });
  }
  // Trigger API call and display class="showP".
  btnEle.on("click", function (e) {
    e.preventDefault();
    lat = jdsjdks
    long =jkdsljd
    getApi(completeApi);
    $(".showP").css("display", "block");
    currentWeather.attr("id", "current-weatherB");

    // Get and SetItem to localstorage and allowing value of the object to be displayed in the
    // Search history-container
    let dKey = "city";
    let dVal = $(this).siblings("#city-input").val();
    let keyItem = { [dKey]: dVal };
    retriveJson.push(keyItem);
    localStorage.setItem("dkey", JSON.stringify(retriveJson)) || [];
    let getLocalItem = JSON.parse(localStorage.getItem("dkey")) || [];
    for (var i = 0; i < getLocalItem.length; i++) {
      let creatBnt = document.createElement("li");
      creatBnt.append(getLocalItem[i].city);
      searchHistory.append(creatBnt);
    }
  });
  // Detect input from user
  cityInput.on("keyup", function () {
    userParam = cityInput.val();
    completeApi = requestUrl + userParam + param1;
  });
  //Eventlistener to delete and erase search history.
  clearSearch.on("click", function () {
    localStorage.clear();
    searchHistory.empty();
    localStorage.removeItem("city");
    window.location.reload();
  });


});
