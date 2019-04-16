const router = require('express').Router();
const { signup, postBin } = require('../../utils/utils.js');

router.post('/signupandsave', (req, res) => {
  console.log('/signupandsave');
  console.log(req.body);
  signup(req.body.user, (err, user) => {
    if (err) { return err.handle(res); }
    console.log(err ? true : false);
    postBin(req.body.bin, (err, bin) => {
      console.log(err ? true : false);
      if (err) { return err.handle(res); }
      console.log('WARN: add bin to user.bins');
      return res.json({ username: user.username, redirect: '/bin/' + bin._id });
    });
  });
});

module.exports = router;