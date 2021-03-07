const express = require('express');

const { getHome, postWeather, getWeather } = require('../controllers/HomeControllers')

const router = express.Router();


router.get('/',getHome);

router.get('/weather-now', getWeather);

router.post('/weather-now', postWeather);

module.exports = router;