const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const { pool } = require('../config/configDB')
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth')
const cors = require('cors')

const initializePassport = require('../config/passportConfig')

initializePassport(passport)

// middlewares
router.use(express.urlencoded({ extended: false }));


router.use(passport.initialize());
router.use(passport.session())

router.use(flash());

//express.json middlewares
router.use(express.json());
router.use(cors())

//Get all users
router.get('/signup', (req, res) => {



    res.render('signup')
});





router.get('/login', (req, res) => {

    res.render('login')
});

//Creating a new user
router.post('/signup', async(req, res) => {

    let { name, email, password, password1 } = req.body;
    console.log({
        name,
        email,
        password,
        password1
    });

    let errors = [];

    //checking for empty fields
    if (!name || !email || !password || !password1) {
        errors.push({ message: 'Please enter all fields' });
    }

    //checking password length
    if (password.length < 6) {
        errors.push({ message: 'Password should be atleast 6 characters' });
    }

    //checking for password and password1 match
    if (password != password1) {
        errors.push({ message: "Passwords don't match" });
    }

    //render errors messases on page if found any
    if (errors.length > 0) {
        res.render('signup', { errors })

    } else {
        //if form validation passed
        let hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);


        //check if email is already in the system
        pool.query(`SELECT email FROM users WHERE email = $1`, [email], (err, result) => {
            if (err) {
                console.log(err.message)
            }
            console.log(result.rows)
            if (result.rows.length > 0) {
                errors.push({ message: 'Email already registered' })
                res.render('signup', { errors })

            } else {

                //insert into database
                pool.query(
                    `INSERT INTO users (name, email, password, role)
                    VALUES($1,$2,$3,$4) RETURNING id, password`, [name, email, hashPassword, 'user'], (err, results) => {
                        if (err) {
                            throw err
                        }
                        console.log(results.row)

                        req.flash('success_msg', 'You are now registered. You can now log in')
                        res.redirect('/users/login')
                    }

                )
            }
        });


    }




});





//authenticate user then redirect

// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/main',
//         failureRedirect: '/users/login',
//         failureFlash: true
//     })(req, res, next);
// })


router.post('/login', passport.authenticate('local', {
        failureRedirect: '/users/login',
        failureFlash: true
    }),
    async(req, res) => {

        const { email } = req.body

        let errors = []
        let user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        try {
            console.log(user.rows[0].role)
            if (user.rows[0].role === 'user') {
                return res.redirect('/main')
            } else if (user.rows[0].role === 'admin') {

                return res.redirect('/indexAdmin')
            } else {
                res.redirect('/users/login', { message })
            }
        } catch (err) {
            console.log(err)

            errors.push({ err: 'Unathorized' })
        }
    })





router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out ');
    res.redirect('/users/login')
})

module.exports = router;