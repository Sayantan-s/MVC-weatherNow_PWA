const express = require('express');

const { getHome, postHome } = require('../controllers/HomeControllers')

const router = express.Router();


router.get('/',getHome);

router.post('/', postHome);

module.exports = router;