const fetch = require('node-fetch');
const Weather = require('../model/WeatherData');
require('dotenv').config;

let lat,long;

exports.getHome = ((req,res) => {
    res
    .status(200)
    .render('index',{
        routeName : 'Home',
        path : req._parsedOriginalUrl.href,
        data : Weather.getDatabyLatLong() 
    })
})

exports.getWeather = ((req,res) => {
    console.log("Hei")
})

exports.postCoords = ((req,res) => {
    const { latitude,longitude } = req.body;
    lat = latitude;
    long = longitude;
    res
    .json({
        status : 'success',
        data : req.body
    })
})


exports.getWeatherByLatLong = ( async(req,res) => {
    const api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=23241c693dde77dee1381e703ea69f89`
    //23241c693dde77dee1381e703ea69f89
    const response = await fetch(api_url);
    const { weather,main,visibility,wind,sys,name } = await response.json();
    const databyLatLong = new Weather(weather,main,visibility,wind,sys,name);
    databyLatLong.saveClientDataByLatLong();
    res.redirect('/');
})
