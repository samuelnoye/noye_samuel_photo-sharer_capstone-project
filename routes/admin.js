const express = require('express')
const router = express.Router();





//Get all photos
router.get('/dash', (req, res) => {


    res.render('admin/dash')
});

//Get a 

router.get('/upload', (req, res) => {


    res.render('admin/upload')
});

router.get('/users', (req, res) => {


    res.render('admin/users')
});

module.exports = router;