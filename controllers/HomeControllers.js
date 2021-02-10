const fetch = require('node-fetch');
const Weather = require('../model/WeatherData');
require('dotenv').config;

let lat,long;

exports.getHome = ((req,res) => {
    const data = Weather.getDatabyLatLong();
    console.log(data);
    res
    .status(200)
    .render('index',{
        routeName : 'Home',
        path : req.url,
        //data
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
    console.log(weather,main,visibility,wind,sys,name);
    const databyLatLong = new Weather(weather,main,visibility,wind,sys,name);
    databyLatLong.saveClientDataByLatLong();
    res
    .status(200)
    .json({
        success : true
    });
})
