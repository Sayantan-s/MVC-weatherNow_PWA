const Weather = require('../model/WeatherData');
require('dotenv').config;

const date = new Date();

const today = date.toDateString().split(' ');
today.pop();

const time = date.toTimeString().split(' ')[0].split(':')[0];

const checkTime = (time > 5 && time < 17) ? 'day' : 'night'

console.log(date.toTimeString())

const fetchAndSave = (urls,cb) => {
    return Weather.fetchDataServerside([...urls],data => {
        const { coord,weather,main,visibility,wind,sys,name,dt } = data[0]; 
        const temperatures = {
            ...main,
            temp : main.temp - 273.15,
        };
        const databyLatLong = new Weather(coord,weather,temperatures,visibility,wind,sys,name,dt,checkTime);
        databyLatLong.saveClientDataByLatLong();
        return cb(data[0]);
    })
}

exports.getHome = ((req,res) => {
    if(req.query.place){
        const { place } = req.query;

        const city = place.toLowerCase()

        const uri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=23241c693dde77dee1381e703ea69f89`;

        return fetchAndSave([uri],data => {
            return res
            .status(200)
            .render('index',{
                routeName : 'Home',
                path : req._parsedOriginalUrl.href,
                data : Weather.getDatabyLatLong() 
            })
        }).catch(_ => console.log(`There is no such place named, ${place}.`))

    }
    return res
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
