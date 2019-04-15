var router = require('express').Router();
var { Bin } = require('../../utils/schema.js');

router.post('/addbin', (req, res) => {
  Bin.create(req.body, (err, doc) => {
    if (err) { return res.status(500).send('Internal Server Error'); }
    return res.status(200);
  });
});

module.exports = router;