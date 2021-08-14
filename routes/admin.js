const express = require('express')
const router = express.Router();





//Get all photos
router.get('/dash', (req, res) => {


    res.render('admin/dash')
});

//Get a 



module.exports = router;