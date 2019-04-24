const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const { Bin } = require('../../utils/schema.js');

router.get('/bin/:ID', function (req, res) {
  const _id = req.params.ID;
  if (_id === 'new' && _id.length === 24) {
    return res.send("I'm a new code bin!");
  }

  Bin.findOne({ _id: new ObjectID(_id) }, (err, doc) => {
    if (err) { return res.status(500).send(err) }
    if (!doc) { return res.status(404); }
    return res.json(doc);
  });
});

module.exports = router;