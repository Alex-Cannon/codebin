var router = require('express').Router();
var passport = require('passport');

router.post('/signin',
  passport.authenticate('local'),
  function (req, res, next) {
    console.log('local auth worked');
    const { username } = req.user;
    res.json({ username });
  });

module.exports = router;