let router = require('express').Router();
let ObjectID = require('mongodb').ObjectID;
let { User } = require('../../utils/schema.js');

router.delete('/deleteuser', (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).send('Must be signed in.');
  }

  User.deleteOne({ _id: new ObjectID(req.user._id) }, (err, result) => {
    if (err) { return res.sendStatus(500); }
    if (!result) { return res.sendStatus(404); }
    return res.sendStatus(200);
  });
});

module.exports = router;