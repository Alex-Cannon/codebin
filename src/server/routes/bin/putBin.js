const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
var { Bin } = require('../../utils/schema.js');
var { postBin } = require('../../utils/utils.js');
const { check } = require('express-validator/check');

router.put('/bin', [
  check(['name', 'author']).escape()
], function (req, res) {
  let { _id, name, html, css, js } = req.body;
  const author = req.user._id;
  if (_id === 'new') {
    postBin(req, (err, doc) => {
      if (err) { return err.handle(res); }
      return res.json(doc);
    });
  } else {
    Bin.updateOne({ _id: new ObjectID(_id) }, { name, html, css, js, author }, (err) => {
      if (err) { res.status(500).send(err); }
      return res.sendStatus(200);
    });  
  }
});

module.exports = router;