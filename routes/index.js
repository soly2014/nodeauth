var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { expressFlash: req.flash('loginMessage'), sessionFlash: res.locals.sessionFlash,auth:req.isAuthenticated() });
});

module.exports = router;

