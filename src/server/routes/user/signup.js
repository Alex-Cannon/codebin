const router = require('express').Router();
const { signup } = require('../../utils/utils.js');
const { check } = require('express-validator/check');

router.post('/signup', [
  check(['username', 'password', 'profilePic']).escape()
], function (req, res) {

  signup(req.body, (err, doc) => {
    if (err) { return err.handle(res); }
    res.json({ username: doc.username });
  });
});

module.exports = router;