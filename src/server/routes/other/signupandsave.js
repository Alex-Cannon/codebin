const router = require('express').Router();
const { signup, postBin } = require('../../utils/utils.js');
const { check } = require('express-validator/check');

router.post('/signupandsave', [
  check(['username', 'password', 'profilePic', 'name', 'author']).escape()
], (req, res) => {
  signup(req.body.user, (err, user) => {
    if (err) { return err.handle(res); }
    postBin(req.body.bin, (err, bin) => {
      if (err) { return err.handle(res); }
      return res.json({ username: user.username, redirect: '/bin/' + bin._id });
    });
  });
});

module.exports = router;