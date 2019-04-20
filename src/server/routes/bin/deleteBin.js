let router = require('express').Router();
let ObjectID = require('mongodb').ObjectID;
let { User, Bin } = require('../../utils/schema.js');

// Deletes a Bin given
// 1) User logged in. 2) User is author. 3) No other errors
router.delete('/deletebin', (req, res) => {
  const bin_id = req.body._id;
  if (!bin_id || bin_id.length !== 24) {
    return res.sendStatus(400);
  }

  Bin.findOne({ _id: new ObjectID(bin_id) }, { author: 1 }, (err, doc) => {
    if (err) { return res.sendStatus(500); }
    if (!doc) { return res.sendStatus(404); }
    // User is author?
    if (doc.author.equals(new ObjectID(req.user._id))) {
      Bin.deleteOne({ _id: new ObjectID(bin_id) }, (err, result) => {
        if (err) { return res.sendStatus(500); }
        if (!result) { return res.sendStatus(404); }
        // Remove Bin from user bins array
        User.updateOne({ _id: req.user._id }, {$pull: {bins: bin_id}}, (err, result) => {
          if (err) { return res.sendStatus(500); }
          if (!result) { return res.sendStatus(404); }
          return res.sendStatus(200);
        })
      });
    } else {
      return res.sendStatus(401);
    }
  });
});

module.exports = router;