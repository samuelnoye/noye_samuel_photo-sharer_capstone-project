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
const storage = multer.diskStorage({
    destination: './img/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 },
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






//admin dashboard
router.get('/dash', ensureAuthenticated, (req, res) => {

    //fetch all pictures
    pool.query(`SELECT * FROM picture`, (err, result) => {
        if (err) {
            console.log(err.message)
        };

        const picture = result.rows

        //getting total pictures
        pool.query(`SELECT count(*) FROM picture`, (err, result) => {
            if (err) {
                console.log(err.message)
            }

            const pictureCount = result.rows[0].count


            //getting total users
            pool.query(`SELECT count(*) FROM users`, (err, result) => {
                if (err) {
                    console.log(err.message)
                }
                const usersCount = result.rows[0].count

                //getting total up votes
                pool.query(`SELECT SUM(up) FROM picture;`, (err, result) => {
                    if (err) {
                        console.log(err.message)
                    }
                    const totalLikes = result.rows[0].sum
                    console.log(totalLikes)

                    //getting total down votes
                    pool.query(`SELECT SUM(down) FROM picture;`, (err, result) => {
                        if (err) {
                            console.log(err.message)
                        }
                        const totalDown = result.rows[0].sum
                        console.log(totalLikes)


                        res.render('admin/dash', {
                            name: req.user.name,
                            picData: picture,
                            picCount: pictureCount,
                            sumLikes: totalLikes,
                            sumDown: totalDown,
                            userCount: usersCount
                        })
                    });
                });
            });
        });
    });
});


//upload page 
router.get('/upload', (req, res) => {
    res.render('admin/upload')

});


// upload and save picture with detials to data
router.post('/upload', upload.single('myImage'), async(req, res) => {


    if (req.file == undefined) {
        res.render('admin/upload', {
            msg: 'Error: No Picture Selected!'
        });
    } else {
        console.log(req.file)



        res.render('admin/upload', {
            msg: 'Picture Uploaded Succesfully with Details!',
            file: `uploads/${req.file.filename}`

        });
    }

    //get values from textfields
    let { title, description } = req.body;

    const up = 0
    const down = 0
    const imgFile = req.file.path
    let errors = [];
    pool.query(
        `INSERT INTO picture (title, description, up, down, img)
                       VALUES($1,$2,$3,$4,$5) RETURNING *`, [title, description, up, down, imgFile.replace("public\\img\\", "/img/")], (err, results) => {


            if (err) {
                throw err
            }

        }

    )





    //insert into database






})

//users page
router.get('/users', (req, res) => {

    pool.query(`SELECT * FROM users`, (err, result) => {
        if (err) {
            console.log(err.message)
        }
        console.log(result.rows)

        const picture = result.rows
        res.render('admin/users', {
                userData: picture
            })
            // res.json(result.rows)
    });
    // res.render('admin/users')
});

module.exports = router;