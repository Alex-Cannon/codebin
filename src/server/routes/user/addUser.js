const router = require('express').Router();

router.post('/adduser', function (req, res) {
  res.send('User added!');
});

module.exports = router;