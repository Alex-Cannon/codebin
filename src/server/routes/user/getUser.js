const router = require('express').Router();
const { User } = require('../../utils/schema.js');

router.get('/user', function (req, res) {
  if (req.user) {
    const { username } = req.user;
    return res.json({ username });  
  }
  return res.status(401).send('Not Signed In.');
});

module.exports = router;