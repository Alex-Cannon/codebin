const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
var { Bin } = require('../../utils/schema.js');
var { postBin } = require('../../utils/utils.js');

router.put('/bin', function (req, res) {
  const { _id, name, html, css, js } = req.body;
  console.log(JSON.stringify({_id, name, html ,css, js}));
  if (_id === 'new') {
    postBin(req, (err, doc) => {
      if (err) { return err.handle(res); }
      return res.json(doc);
    });
  } else {
    Bin.updateOne({ _id: new ObjectID(_id) }, { name, html, css, js }, (err) => {
      if (err) { res.status(500).send(err); }
      return res.sendStatus(200);
    });  
  }
});

module.exports = router;