const express = require('express')
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const { pool } = require('../config/configDB')

//express.json middlewares
router.use(express.json());

//Welcome page
router.get('/', ensureAuthenticated, (req, res) => {

    //fetch all pictures
    pool.query(`SELECT * FROM picture`, (err, result) => {
        if (err) {
            console.log(err.message)
        }
        console.log(result.rows)
            //res.json(result.rows)
        const picture = result.rows
            //const picId = picture.id
        res.render('main', {
            name: req.user.name,
            picData: picture
        })
    });
});

// single ge
router.get('/picPage/:id', ensureAuthenticated, (req, res) => {
    // res.send('checking')
    const id = req.params.id

    console.log(req.params.id)
    console.log(id)
        // check if email is already in the system
    pool.query(`SELECT * FROM picture WHERE id = $1`, [id], (err, result) => {
        if (err) {
            console.log(err.message)
        }
        console.log(result.rows)
            //res.json(result.rows)
        const picture = result.rows
        console.log(result.rows[0].title)
        res.render('picPage', {
            name: req.user.name,
            title: result.rows[0].title,
            description: result.rows[0].description,
            img: result.rows[0].img
        })
    });

});





router.get('/login', ensureAuthenticated, (req, res) => {


    res.render('login', {
        name: req.user.name
    })
});

module.exports = router;