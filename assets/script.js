$(function () {
    let cityInput = $('#city-input')
    let btnEle = $('#btn')
    let addWeather = $('#add-weather')
    let requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='
    let userParam = cityInput.val()
    let param1 = '&limit=5&appid=a763be4befc9d6fd3981fb3420b2dcb0'
    let completeApi = requestUrl + userParam + param1

    let weatherurl = 'http://api.openweathermap.org/data/2.5/forecast?lat='
    let weatherurl2 = '&lon='
    let weatherurl3 = '&units=imperial&appid=a763be4befc9d6fd3981fb3420b2dcb0'


   //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=e4f61d3c54ddc6861e128d4f4eb2b22a


    function getApi(completeApi) {

        console.log('test')
        fetch(completeApi, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)


                let lat = data[0].lat;
                let latString = lat.toString();
                let lon = data[0].lon;
                let longString = lon.toString();
                let completeApi2 = weatherurl + latString + weatherurl2 + longString + weatherurl3;


                fetch(completeApi2, {
                    method: 'GET',
                })
                    .then (function (response){
                        return response.json();
                    })
                    .then(function (info){
                        console.log(info)
                        let weather = info.list[0].weather[0].main
                        let temperture = info.list[0].main.temp
                        let humanity = info.list[0].main.humidity
                        console.log(weather)
                        console.log(temperture)
                        console.log(humanity)
                    })
            })





    }
    // TODO: This is a test code. Delete this when Done
    if (userParam === "") {
        console.log('empty string')
    } else if (userParam === null) {
        console.log('none')
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