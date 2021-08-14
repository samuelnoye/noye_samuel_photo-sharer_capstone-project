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



module.exports = router;