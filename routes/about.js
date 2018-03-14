var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/',isLoggedIn, function(req, res, next) {

    res.render('pages/profile');
});

module.exports = router;



// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    console.log(req.isAuthenticated());

    res.redirect('/');
}
