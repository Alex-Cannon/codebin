let router = require('express').Router();
let ObjectID = require('mongodb').ObjectID;
let { User, Bin } = require('../../utils/schema.js');

router.delete('/deleteuser', (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).send('Must be signed in.');
  }

  User.findOne({ _id: new ObjectID(req.user._id) }, { bins: 1 }, (err, doc) => {
    if (err) { return res.sendStatus(500); }
    if (!doc) { return res.sendStatus(404); }
    if (!doc.bins) {
      User.deleteOne({ _id: new ObjectID(req.user._id) }, (err, result) => {
        if (err) { return res.sendStatus(500); }
        if (!result) { return res.sendStatus(404); }
        
        return res.sendStatus(200);
      });
    } else {
      let count = 1;
      doc.bins.forEach((_id) => {
        Bin.deleteOne({ _id: new ObjectID(_id) }, (err) => {
          if (err) { return res.sendStatus(500); }
          if (count === doc.bins.length) {
            User.deleteOne({ _id: new ObjectID(req.user._id) }, (err, result) => {
              if (err) { return res.sendStatus(500); }
              if (!result) { return res.sendStatus(404); }
              
              return res.sendStatus(200);
            });
          }
          count++;
        });
      });
    }
  });
});

module.exports = router;