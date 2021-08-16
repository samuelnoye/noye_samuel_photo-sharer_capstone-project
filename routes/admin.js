const express = require('express');
const { contentSecurityPolicy } = require('helmet');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { pool } = require('../config/configDB')
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors')


router.use(flash());
router.use(express.json());
router.use(cors())



// middlewares
router.use(express.urlencoded({ extended: true }));


router.use(flash());




// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/img/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
})

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}






//Get all photos
router.get('/dash', (req, res) => {


    res.render('admin/dash')
});

//Get a 

router.get('/upload', (req, res) => {
    res.render('admin/upload')

});

router.post('/upload', upload.single('myImage'), async(req, res) => {



    if (req.file == undefined) {
        res.render('admin/upload', {
            msg: 'Error: No Picture Selected!'
        });
    } else {
        console.log(req.file)

        res.render('admin/upload', {
            msg: 'Picture Uploaded Succesfully!',
            file: `uploads/${req.file.filename}`

        });
    }

    let { title, description } = req.body;
    console.log({
        title,
        description
    });



    const imgFile = req.file.path
    let errors = [];



    //insert into database

    pool.query(
        `INSERT INTO picture (title, description, img)
                        VALUES($1,$2,$3) RETURNING *`, [title, description, imgFile], (err, results) => {
            if (err) {
                throw err
            }
            // console.log(results.row)
            //req.flash('success_msg', 'You are now registered. You can now log in')
            //res.redirect('/users/login')
        }

    )





})

router.get('/users', (req, res) => {


    res.render('admin/users')
});

module.exports = router;
module.exports = router;