const express = require('express');

const { getHome, postWeather, postWeatherByPlace } = require('../controllers/HomeControllers')

const router = express.Router();


router.get('/',getHome);

router.post('/weather-now', postWeather);

router.post('/weather-by-place', postWeatherByPlace)

module.exports = router;