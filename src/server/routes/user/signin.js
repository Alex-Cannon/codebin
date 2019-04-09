var router = require('express').Router();
var passport = require('passport');

router.post('/signin',
  passport.authenticate('local'),
  function (req, res) {
    const { username } = req.user;
    console.log(username);
    return res.json({ username });
  });

module.exports = router;