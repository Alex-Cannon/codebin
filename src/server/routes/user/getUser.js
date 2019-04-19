const router = require('express').Router();

router.get('/user', function (req, res) {
  if (req.user) {
    const { username, _id, profilePic } = req.user;
    return res.json({ username, _id, profilePic });
  }
  return res.status(401).send('Not Signed In.');
});

module.exports = router;