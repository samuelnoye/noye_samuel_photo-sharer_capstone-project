const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const { pool } = require('../config/configDB')
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth')

const initializePassport = require('../config/passportConfig');
const { route } = require('./users');

initializePassport(passport)

// middlewares
router.use(express.urlencoded({ extended: true }));

router.use(express.json());




//index page
router.get('/', (req, res) => {
    res.render('index')
});

//admin Index page
router.get('/indexadmin', (req, res) => {
    res.render('indexAdmin', { name: req.user.name, })
});

//about page
router.get('/about', ensureAuthenticated, (req, res) => {


    res.render('about', {
        name: req.user.name
    })
});

//single picture page route
router.get('/picpage/:id', ensureAuthenticated, async(req, res) => {

    // get id
    const id = req.params.id


    // fetch pic by the id
    const picture = await pool.query(`SELECT * FROM picture WHERE id = $1`, [id], (err, result) => {
        if (err) {
            console.log(err.message)
        }

        //render picpage with details

        res.render('picPage', {
            name: req.user.name,
            id: result.rows[0].id,
            title: result.rows[0].title,
            description: result.rows[0].description,
            img: result.rows[0].img
        })
    });

});
module.exports = router;