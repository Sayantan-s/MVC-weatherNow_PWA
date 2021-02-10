const express = require('express');

const { getHome, postCoords, getWeatherByLatLong } = require('../controllers/HomeControllers')

const router = express.Router();


router.get('/',getHome);

router.post('/',postCoords);

router.get('/weatherbyll',getWeatherByLatLong);


module.exports = router;