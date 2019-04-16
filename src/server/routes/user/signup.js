const router = require('express').Router();
const { signup } = require('../../utils/utils.js');

router.post('/signup', function (req, res) {
  signup(req.body, (err, doc) => {
    if (err) { return err.handle(res); }
    res.json({ username: doc.username });
  });
});

module.exports = router;