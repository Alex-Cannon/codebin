const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const { Bin } = require('../../utils/schema.js');

router.get('/bin/:ID', function (req, res) {
  Bin.findOne({ _id: new ObjectID(req.params.ID) }, (err, doc) => {
    if (err) { return res.status(500).send(err) }
    if (!doc) { return res.status(404); }
    return res.json(doc);
  });
});

module.exports = router;