$(function () {
    let cityInput = $('#city-input').value
    let btnEle = $('#btn')
    let requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='
    const userParam = 'seattle'
    let param1 = '&limit=5&appid=a763be4befc9d6fd3981fb3420b2dcb0'
    let completeApi = requestUrl + userParam + param1


    function getApi(completeApi) {
        fetch(completeApi, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
            })
    }

    if (userParam === "") {
        console.log('empty string')
    } else if (userParam === null) {
        console.log('none')
    }

    btnEle.on('click', getApi(completeApi))

    // let numbers = [1,2,3,4,5,6]
    // for (let i in numbers){
    //     let key = i;
    //     let value = userParam
    //     let test = {[key]: value};
    //     console.log(test)
}

)