const Weather = require('../model/WeatherData');
require('dotenv').config;

const fetchAndSave = (urls,cb) => {
    return Weather.fetchDataServerside([...urls],data => {
        const { coord,weather,main,visibility,wind,sys,name,dt } = data[0]; 
        const temperatures = {
            ...main,
            temp : main.temp - 273.15
        };
        const databyLatLong = new Weather(coord,weather,temperatures,visibility,wind,sys,name,dt);
        databyLatLong.saveClientDataByLatLong();
        return cb(data[0]);
    })
}

exports.getHome = ((req,res) => {
    res
    .status(200)
    .render('index',{
        routeName : 'Home',
        path : req._parsedOriginalUrl.href,
        data : Weather.getDatabyLatLong() 
    })
})

exports.postWeather = (req,res) => {
    const { latitude,longitude } = req.body;
    const api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=23241c693dde77dee1381e703ea69f89`
    const api_url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=daily&appid=23241c693dde77dee1381e703ea69f89`

    return fetchAndSave([api_url,api_url2],_ => {
        return res
        .status(200)
        .json({
            status : "Ok"
        });
    }).catch(err => console.log(err));
}

exports.postWeatherByPlace = (req,res) => {
    const { place } = req.body;

    const city = place.toLowerCase()

    const uri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=23241c693dde77dee1381e703ea69f89`;

    return fetchAndSave([uri],data => {
        return res
        .status(data.cod)
        .json({
            status : data.cod,
            statusText : `${city}'s data is sent to the client.`
        })
    }).catch(_ => console.log(`There is no such place named, ${place}.`))
}
