let router = require('express').Router();
let { Bin } = require('../../utils/schema.js');

router.get('/bins', (req, res) => {
  Bin.find({}, (err, docs) => {
    if (err) { return res.sendStatus(500); }
    if (!docs) { return res.sendStatus(404); }
    return res.json(docs);
  })
});

module.exports = router;