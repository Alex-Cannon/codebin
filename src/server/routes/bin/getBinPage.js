const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const { Bin } = require('../../utils/schema.js');

router.get('/bin/page/:ID', function (req, res) {
  const _id = req.params.ID;
  if (_id === 'new') {
    return res.send('');
  }

  Bin.findOne({ _id: new ObjectID(_id) }, (err, doc) => {
    if (err) { return res.status(500).send(err) }
    if (!doc) { return res.status(404); }
    return res.send(renderHtml(doc.html, doc.css, doc.js));
  });
});

const renderHtml = function (html, css, js) {
  return `<!DOCTYPE html><html><head><style>${css}</style></head>${html}<script>${js}</script></html>`;
}

module.exports = router;