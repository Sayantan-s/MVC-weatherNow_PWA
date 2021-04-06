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

    const { place } = req.query;

    if(place){

        const city = place.toLowerCase()

        const uri = `${process.env.URL}/weather?q=${city}&appid=${process.env.API_KEY}`;

        return fetchAndSave([uri],_ => {
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
    const api_url = `${process.env.URL}/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}`
    const api_url2 = `${process.env.URL}/onecall?lat=${latitude}&lon=${longitude}&exclude=daily&appid=${process.env.API_KEY}`

    return fetchAndSave([api_url,api_url2],_ => {
        return res
        .status(200)
        .json({
            status : "Ok"
        });
    }).catch(err => console.log(err));
}
