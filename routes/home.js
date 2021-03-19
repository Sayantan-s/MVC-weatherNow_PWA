const express = require('express');

const { getHome, postWeather, getWeather, postWeatherByPlace } = require('../controllers/HomeControllers')

const router = express.Router();


router.get('/',getHome);

router.get('/weather-now', getWeather);


router.post('/weather-now', postWeather);

router.post('/weather-by-place', postWeatherByPlace)

module.exports = router;