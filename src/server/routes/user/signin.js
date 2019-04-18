var router = require('express').Router();
var passport = require('passport');

router.post('/signin',
  passport.authenticate('local'),
  function (req, res) {
    const { username, _id } = req.user;
    return res.json({ username, _id });
  });

module.exports = router;