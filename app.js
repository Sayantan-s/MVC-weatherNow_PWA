const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config;

const Home = require('./routes/home');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('static'));

app.use(Home); 
app.use((req,res) => {
    res
    .status(404)
    .render('404',{
        routeName : 'Error',
        path : req._parsedOriginalUrl.href,
    })
})


//api.openweathermap.org/data/2.5/weather?q=kolkata&appid=23241c693dde77dee1381e703ea69f89
//api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//apikey=23241c693dde77dee1381e703ea69f89

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`I am listening to port ${PORT}`)
})