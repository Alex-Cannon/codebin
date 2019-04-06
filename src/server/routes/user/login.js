var router = require('express').Router();
var { passport } = require('../../utils/setupPassport.js');

router.post('/login', 
  passport.authenticate('local'),
  function (req, res) {
    // will fire if authenticated
    res.json(req.user);
  });

module.exports = router;