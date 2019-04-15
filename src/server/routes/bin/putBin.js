const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
var { Bin } = require('../../utils/schema.js');

router.put('/bin', function (req, res) {
  const { _id, name, html, css, js } = req.body;
  console.log(JSON.stringify({_id, name, html ,css, js}));
  if (_id === 'new') {
    if (req.user) {
      Bin.create({ name, html, css, js }, (err, doc) => {
        console.log(err);
        if (err) { res.status(500).send(err); }
        return res.json(doc);
      });
    }
    return res.status(401).send('Must be Signed In to save Bins.');
  } else {
    Bin.updateOne({ _id: new ObjectID(_id) }, { name, html, css, js }, (err) => {
      if (err) { res.status(500).send(err); }
      return res.sendStatus(200);
    });  
  }
});

module.exports = router;