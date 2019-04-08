const router = require('express').Router();
const { User } = require('../../utils/schema.js');

router.post('/adduser', function (req, res) {
  User.findOne({ username: req.body.username }, (findErr, exists) => {
    if (findErr) { return res.status(500).send('Internal Server Error. Please Try Again.'); }
    if (!exists) {
      User.create(req.body, (err, doc) => {
        if (err) { return res.status(500).json(err); }
        console.log('user added');
        var { _id, username, bins } = doc;
        return res.json({ _id, username});
      });
    } else {
      return res.status(400).send('Username is Taken. Please use a different username.');
    }
  });
});

module.exports = router;