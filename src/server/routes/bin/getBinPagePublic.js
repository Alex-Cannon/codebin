var router = require('express').Router();

// Anonymous/non-author, temporary editing of a public bin.
// User GETs original bin. Uses this route to populate an iframe with new markup.
router.get('/genpage', (req, res) => {
  const { html, css, js } = req.query;
  return res.send(renderHtml(html, css, js));
});

const renderHtml = function (html, css, js) {
  return `<!DOCTYPE html><html><head><style>${css}</style></head>${html}<script>${js}</script></html>`;
}

module.exports = router;