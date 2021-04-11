const express = require('express');

const { getHome, postWeather } = require('../controllers/HomeControllers')

const router = express.Router();

router
.route('/')
.get(getHome)
.post(postWeather);

module.exports = router;