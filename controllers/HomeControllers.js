const fetch = require('node-fetch');
const Weather = require('../model/WeatherData');
require('dotenv').config;

exports.getHome = ((req,res) => {
    res
    .status(200)
    .render('index',{
        routeName : 'Home',
        path : req._parsedOriginalUrl.href,
        data : Weather.getDatabyLatLong() 
    })
})

exports.postWeather = async(req,res) => {
    const { latitude,longitude } = req.body;
    const api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=23241c693dde77dee1381e703ea69f89`
    const response = await fetch(api_url);
    const { coord,weather,main,visibility,wind,sys,name } = await response.json();
    const temperatures = {
        ...main,
        temp : main.temp - 273.15
    };
    const databyLatLong = new Weather(coord,weather,temperatures,visibility,wind,sys,name);
    databyLatLong.saveClientDataByLatLong();
    res
    .status(200)
    .json({
        status : 200
    });
}
