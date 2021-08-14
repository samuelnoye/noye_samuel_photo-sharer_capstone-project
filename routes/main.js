const express = require('express')
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')




//Welcome page
router.get('/', ensureAuthenticated, (req, res) => {


    res.render('main', {
        name: req.user.name
    })
});

//  

router.get('/login1', ensureAuthenticated, (req, res) => {


    res.render('login1', {
        name: req.user.name
    })
});

module.exports = router;