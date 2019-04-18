const router = require('express').Router();
const { User } = require('../../utils/schema.js');

router.get('/user', function (req, res) {
  if (req.user) {
    const { username, _id } = req.user;
    return res.json({ username, _id });  
  }
  return res.status(401).send('Not Signed In.');
});

module.exports = router;