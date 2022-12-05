$(function () {
    // Global variables
    let cityInput = $('#city-input')
    let btnEle = $('#btn')
    let fiveWeather = $('#fiveWeather')
    let weatherDiv = $('#weather-display')
    let userParam = cityInput.val()
    let fiveWeatherIcon = $('#fiveWeatherIcon')
    let cloudsIcon = 'https://img.icons8.com/dotty/512/clouds.png'
    let rainIcon = 'https://img.icons8.com/dotty/512/heavy-rain.png'
    let sunnyIcon = 'https://img.icons8.com/dotty/512/sun.png'
    let thunderIcon = 'https://img.icons8.com/dotty/512/storm.png'
    let snowIcon  = 'https://img.icons8.com/dotty/512/snow.png'
        //API PARAMS
    let requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='
    let param1 = '&limit=5&appid=a763be4befc9d6fd3981fb3420b2dcb0'
    let completeApi = requestUrl + userParam + param1
    let weatherurl = 'http://api.openweathermap.org/data/2.5/forecast?lat='
    let weatherurl2 = '&lon='
    let weatherurl3 = '&units=imperial&appid=a763be4befc9d6fd3981fb3420b2dcb0'

    // Fetching API to get data by location name
    function getApi(completeApi) {
        fetch(completeApi, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)

                // Declaring var to use it for nested API to grab weather information by adding lat and lon from the first API
                let lat = data[0].lat;
                let latString = lat.toString();
                let lon = data[0].lon;
                let longString = lon.toString();
                let completeApi2 = weatherurl + latString + weatherurl2 + longString + weatherurl3;

                // Nested API using data from first fetch above to grab lan and lon to grab weather information
                fetch(completeApi2, {
                    method: 'GET',
                })
                    .then (function (response){
                        return response.json();
                    })
                    .then(function (info){

                        //assigning var to information that is needed for appending to html
                        console.log(info)
                        let weather = info.list[0].weather[0].main
                        let temperture = info.list[0].main.temp
                        let humidity = info.list[0].main.humidity
                        // appending varibles to the weather display
                        let currWeather = $('#curr-weather').append('Today Weather Is: ' + weather)
                        let currTemp = $('#curr-temp').append('Current Temperture Is: ' + temperture + ' °F')
                        let currHumid = $('#curr-humidity').append('Humidity Today is: ' + humidity + '%')

                        if (weather === 'Clouds'){
                            $(document).ready(function() {
                                $(`<img src='${cloudsIcon}' style="height: 50px; width: 50px;">`).appendTo('#container');
                            });
                        } else if (weather === 'Rain'){
                            $(document).ready(function() {
                                $(`<img src='${rainIcon}'style="height: 50px; width: 50px; >`).appendTo('#container');
                            });
                        } else if (weather === 'Clear'){
                            $(document).ready(function() {
                                $(`<img src='${sunnyIcon}' style="height: 50px; width: 50px;>`).appendTo('#container');
                            });
                        } else if (weather === 'Thunderstorm'){
                            $(document).ready(function() {
                                $(`<img src='${thunderIcon}' style="height: 50px; width: 50px;>`).appendTo('#container');
                            });
                        } else {
                            $(document).ready(function() {
                                $(`<img src='${snowIcon}' style="height: 50px; width: 50px;>`).appendTo('#container');
                            });
                        }

                        // Display 5 days weather forecast of the city.
                        for (var i = 0; i < 5; i ++){

                            let fiveDayWeather = info.list[i + 1].weather[0].main
                            let fiveDayTemp = info.list[i + 1].main.temp
                            let fiveDayHumid = info.list[i + 1].main.humidity
                            let fiveWeatherDiv = document.createElement('div')
                            let fiveWeatherUlEle = document.createElement('ul')
                            let fiveWeatherLiEle = document.createElement('li')
                            fiveWeatherLiEle.append('Weather: ' + fiveDayWeather + '   | ')
                            fiveWeatherLiEle.append('Temperture: ' + fiveDayTemp + '°F  | ')
                            fiveWeatherLiEle.append('Humidity: ' + fiveDayHumid + '   %')
                            fiveWeatherUlEle.append(fiveWeatherLiEle)
                            fiveWeatherDiv.append(fiveWeatherUlEle)
                            fiveWeather.append(fiveWeatherDiv)

                            if (fiveDayWeather === 'Clouds'){
                                $(document).ready(function() {
                                    $(`<img src='${cloudsIcon}' style="height: 50px; width: 50px;">`).appendTo('#fiveWeatherDiv');
                                });
                            } else if (fiveDayWeather === 'Rain'){
                                $(document).ready(function() {
                                    $(`<img src='${rainIcon}'style="height: 50px; width: 50px; >`).appendTo('#fiveWeatherDiv');
                                });
                            } else if (fiveDayWeather === 'Clear'){
                                $(document).ready(function() {
                                    $(`<img src='${sunnyIcon}' style="height: 50px; width: 50px;>`).appendTo('#fiveWeatherDiv');
                                });
                            } else if (fiveDayWeather === 'Thunderstorm'){
                                $(document).ready(function() {
                                    $(`<img src='${thunderIcon}' style="height: 50px; width: 50px;>`).appendTo('#fiveWeatherDiv');
                                });
                            } else {
                                $(document).ready(function() {
                                    $(`<img src='${snowIcon}' style="height: 50px; width: 50px;>`).appendTo('#fiveWeatherDiv');
                                });

                            }
                        }
                    })
            })
    }

    btnEle.on('click', function(e){
        e.preventDefault();
        getApi(completeApi)
    })

    cityInput.on('keyup', function(){
        userParam = cityInput.val();
        completeApi = requestUrl + userParam + param1
    })

    // let numbers = [1,2,3,4,5,6]
    // for (let i in numbers){
    //     let key = i;
    //     let value = userParam
    //     let test = {[key]: value};
    //     console.log(test)
}

)