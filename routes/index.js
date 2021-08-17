const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const { pool } = require('../config/configDB')
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const initializePassport = require('../config/passportConfig')

initializePassport(passport)

// middlewares
router.use(express.urlencoded({ extended: false }));

router.use(express.json());




//Get all photos
router.get('/', (req, res) => {
    res.render('index')
});


module.exports = router;