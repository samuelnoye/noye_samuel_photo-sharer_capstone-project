const express = require('express');
const { contentSecurityPolicy } = require('helmet');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { pool } = require('../config/configDB')
const { ensureAuthenticated } = require('../config/auth')
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors')


//middlewares
router.use(flash());
router.use(express.json());
router.use(cors())

router.use(express.urlencoded({ extended: true }));


router.use(flash());




// Set The Storage Engine
router.get('/picpage/:id', ensureAuthenticated, (req, res) => {

    // get id
    const id = req.params.id

    console.log(req.params.id)
    console.log(id)

    // fetch pic by the id
    pool.query(`SELECT * FROM picture WHERE id = $1`, [id], (err, result) => {
        if (err) {
            console.log(err.message)
        }

        const picture = result.rows
        console.log(result.rows[0].title)

        //render picpage with details
        res.render('picpage', {
            name: req.user.name,
            title: result.rows[0].title,
            description: result.rows[0].description,
            img: result.rows[0].img
        })
    });

});

module.exports = router;