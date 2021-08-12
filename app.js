const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require("helmet");
const session = require('express-session');
const flash = require('express-flash');
const conflash = require('connect-flash');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
//const ejsLint = require('ejs-lint');

//database
const {
    pool
} = require('./config/configDB')


//start express
const app = express();
//app.use(helmet());



//express session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,

}))

//connect flash
app.use(flash())

//global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg')
    next();
});

// middlewares
app.search(express.json());

//bodyparser
app.use(express.urlencoded({ extended: false }));


// view engine setup
app.use(expressLayouts);
app.set('view engine', 'ejs');


//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/vendor', express.static(__dirname + 'public/vendor'));

//test database



// Index routes
app.use('/', require('./routes/index'));


//users routes
app.use('/users', require('./routes/users'));

//main routes
app.use('/main', require('./routes/main'));





//start server
app.listen(8000, () => {
    console.log('Server is listening on Port 8000')
})