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

exports.getWeather = ((req,res) => {
    res.redirect('/');
})

exports.postWeather = (req,res) => {
    const { latitude,longitude } = req.body;
    const api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=23241c693dde77dee1381e703ea69f89`
    const api_url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=daily&appid=23241c693dde77dee1381e703ea69f89`
    Promise.all([
        api_url,
        api_url2
    ].map(url => fetch(url)))
    .then(res => Promise.all(res.map(result => result.json())))
    .then(data => {
        const { coord,weather,main,visibility,wind,sys,name,dt } = data[0]; 
        const temperatures = {
            ...main,
            temp : main.temp - 273.15
        };
        const databyLatLong = new Weather(coord,weather,temperatures,visibility,wind,sys,name,dt);
        databyLatLong.saveClientDataByLatLong();
        res
        .status(200)
        .json({
            status : "Ok"
        });
    })
    .catch(err => console.log(err));
}

exports.postWeatherByPlace = (req,res) => {
    const { place } = req.body;
    const uri = `https://api.openweathermap.org/data/2.5/weather?q=${place.toLowerCase()}&appid=23241c693dde77dee1381e703ea69f89`;
    fetch(uri)
    .then(res => res.json())
    .then(data => {
        return res
        .status(data.cod)
        .json({
            status : data.cod,
            data
        })
    })
    .catch(err => console.log(error));
}
