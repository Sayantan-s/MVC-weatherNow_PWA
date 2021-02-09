const express = require('express');

const { getHome, postCoords } = require('../controllers/HomeControllers')

const router = express.Router();


router.get('/',getHome);

router.post('/',postCoords);


module.exports = router;