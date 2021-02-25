const express = require('express');

const { getHome, postWeather } = require('../controllers/HomeControllers')

const router = express.Router();


router.get('/',getHome);

router.post('/weather-now', postWeather);

module.exports = router;