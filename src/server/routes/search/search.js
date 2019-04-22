let router = require('express').Router();
let { Bin } = require('../../utils/schema.js');

router.get('/searchbins', (req, res) => {
  if (!req.query || !req.query.search) {
    return res.sendStatus(400);
  }

  Bin.find({ name: { $regex: new RegExp(`.*${req.query.search}.*`), $options: 'i' }}, { name: 1 }, (err, bins) => {
    if (err) { return res.sendStatus(500); }
    if (!bins) { return res.sendStatus(404); }
    return res.json(bins);
  });
});

module.exports = router;