var router = require('express').Router();

router.get('/signout',
  function (req, res, ) {
    req.logout();
    console.log('logout fired');
    res.send('OK');
  });

module.exports = router;
