const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/uploads' });
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const User = require('../models/user');
const app = express();
const passport = require('passport');
const Strategy = require('passport-local').Strategy;


/* GET sign-up page. */
router.get('/signup', function(req, res, next) {
  res.render('pages/signup', { title: 'Express' });
});

/* POST sign-up page. */
router.post('/signup', upload.single('profile_pic'),[

       check('email').isEmail().withMessage('must be an email').trim().normalizeEmail(),
       check('fullname').isLength({ min: 5 }).withMessage('Full Name Is Required')

      ] ,function(req, res, next) {

      // Get the validation result whenever you want; see the Validation Result API for all options!
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // return res.status(422).json({ errors: errors.mapped() });
        return res.render('pages/signup',{ errors: errors.mapped() });
      } 


        try {
              var b = new User({ name:req.body.fullname ,username:req.body.username,password:req.body.password ,email:req.body.email});
              b.save(function (err,data) {
                 console.log(data); // 'Silence' 
              });
        } catch (err) {
             console.log(err)
        }
        

        const name = req.body.name;
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const password_confirmation = req.body.password_confirmation;
        
        if (req.file) {
          const imageName = req.file.originalname;
          const mimetype = req.file.mimetype;
          const path = req.file.path;
          const size = req.file.size;
          const filename = req.file.filename;
        } else {
          const filename = 'noimage.png';    
        }
      	
        res.send('damn');
        

});


/* GET Login page. */
router.get('/login', function(req, res, next) {
  res.render('pages/login', { title: 'Express',expressFlash: req.flash('loginMessage') });
});


router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/auth/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


// LOGOUT ==============================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
