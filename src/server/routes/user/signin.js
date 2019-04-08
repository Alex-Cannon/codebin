var router = require('express').Router();
var passport = require('passport');

router.post('/signin', function (req, res, next) {
  console.log('signing in...');
  next();
},
  passport.authenticate('local'),
  function (req, res, next) {
    console.log('local auth worked');
    res.send('OK');
  }, 
  function(err, req, res, next) {
    console.log(err);
    res.send('bad');
  });

module.exports = router;