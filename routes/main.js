const express = require('express')
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const multer = require('multer');
const path = require('path');


//Welcome page
router.get('/', ensureAuthenticated, (req, res) => {


    res.render('main', {
        name: req.user.name
    })
});

//  

router.get('/login', ensureAuthenticated, (req, res) => {


    res.render('login1', {
        name: req.user.name
    })
});

module.exports = router;