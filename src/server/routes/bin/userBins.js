const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const { User, Bin } = require('../../utils/schema.js');

router.get('/userbins/:USER_ID', (req, res) => {
  User.findOne({ _id: new ObjectID(req.params.USER_ID) }, (err, doc) => {
    if (err) { return res.status(500).send('Internal server error'); }
    if (!doc) { return res.status(404).send('404 user not found'); }
    Bin.find({ author: new ObjectID(doc._id) }, (err, docs) => {
      if (err) { return res.status(500).send('Internal server error'); }
      if (!docs) { return res.send('no docs for this user'); }
      res.json(docs);
    });
  });
});

module.exports = router;