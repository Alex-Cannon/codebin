const router = require('express').Router();
const { User } = require('../../utils/schema.js');

router.get('/user', function (req, res) {
  console.log('got user');
  const { username } = req.user;
  return res.json({ username });
});

module.exports = router;