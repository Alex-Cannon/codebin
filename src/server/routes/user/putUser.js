let router = require('express').Router();
let ObjectID = require('mongodb').ObjectID;
let { validUsername } = require('../../utils/utils.js');
let { User } = require('../../utils/schema.js');
const { check } = require('express-validator/check');

router.put('/edituser', [
  check(['username', 'password', 'profilePic' ]).escape()
], (req, res) => {
  console.log(JSON.stringify(req.body));

  if (req.user && req.user._id) {
    if (req.body.username) {
      if (validUsername(req.body.username)) {
        User.updateOne({ _id: new ObjectID(req.user._id) }, req.body, (err, result) => {
          if (err) { return res.sendStatus(500); }
          if (!result) { return res.sendStatus(404); }
          return res.sendStatus(200);
        });
      } else {
        return res.status(400).send('Username must be at least 6 characters and a string.');
      }
    } else {
      User.updateOne({ _id: new ObjectID(req.user._id) }, req.body, (err, result) => {
        if (err) { return res.sendStatus(500); }
        if (!result) { return res.sendStatus(404); }
        return res.sendStatus(200);
      });  
    }
  } else {
    return res.status(401).send('Must Sign In.');
  }
});

module.exports = router;