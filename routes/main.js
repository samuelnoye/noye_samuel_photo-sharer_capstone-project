const express = require('express')
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const { pool } = require('../config/configDB')
const cors = require('cors')


//express.json middlewares
router.use(express.json());
router.use(cors())

//Welcome page
router.get('/', ensureAuthenticated, (req, res) => {

    //fetch all pictures
    pool.query(`SELECT * FROM picture`, (err, result) => {
        if (err) {
            console.log(err.message)
        }
        // console.log(result.rows)
        //res.json(result.rows)
        const picture = result.rows
            //const picId = picture.id
        res.render('main', {
            name: req.user.name,
            picData: picture
        })
    });
});






router.get('/login', ensureAuthenticated, (req, res) => {


    res.render('login', {
        name: req.user.name
    })
});



module.exports = router;