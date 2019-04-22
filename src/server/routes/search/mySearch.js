let router = require('express').Router();
let ObjectID = require('mongodb').ObjectID;
let { Bin } = require('../../utils/schema.js');

router.get('/search/mybins', (req, res) => {
  if (!req.query || !req.query.search) {
    return res.sendStatus(400);
  }
  if (!req.user || !req.user._id) {
    return res.sendStatus(401);
  }

  Bin.find({ 
    name: { $regex: new RegExp(`.*${req.query.search}.*`), $options: 'i' },
    author: new ObjectID(req.user._id)
  }, { name: 1}, (err, bins) => {
    if (err) { return res.sendStatus(500); }
    if (!bins) { return res.sendStatus(404); }
    return res.json(bins);
  });
});

module.exports = router;