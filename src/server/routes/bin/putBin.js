const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
var { User, Bin } = require('../../utils/schema.js');

router.put('/bin', function (req, res) {
  const { _id, name, html, css, js } = req.body;
  if (_id === 'new') {
    if (req.user) {

    } else {
      Bin.create({ name, html, css, js }, (err, doc) => {
        if (err) { res.status(500).send(err); }
        return res.json(doc._id);
      });
    }
  } else {
    Bin.updateOne({ _id: new ObjectID(_id) }, { name, html, css, js }, (err) => {
      if (err) { res.status(500).send(err); }
      return res.sendStatus(200);
    });  
  }
});

module.exports = router;