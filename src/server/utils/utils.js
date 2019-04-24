var ObjectID = require('mongodb').ObjectID;
const { User, Bin } = require('./schema.js');

module.exports = {
  signup: (auth, cb) => {
    switch(auth.method) {
      default:
        User.findOne({ username: auth.username }, (err, exists) => {
          if (err) { return cb({handle: (res) => res.status(500).send('Internal server error')}, null); }
          if (!exists) {
            User.create(auth, (err, doc) => {
              if (err) { cb({handle: (res) => res.status(500).send('Internal server error')}, null); }
              return cb(null, doc);
            });
          } else {
            return cb({handle: (res) => res.status(400).send('Username already exists')}, null);
          }
        });
    }
  },
  postBin: (req, cb) => {
    if (req.user) {
      const { name, html, css, js } = req.body;
      const author = req.user._id;
      Bin.create({ name, html, css, js, author }, (err, doc) => {
        if (err) { return cb({handle: (res) => res.status(500).send('Internal server error.')}, null) }
        if (!doc) { return cb({handle: (res) => res.status(400).send('Doc not found')}, null) }
        User.updateOne({ _id: new ObjectID(req.user._id) }, {$addToSet: {'bins': doc._id}}, (err) => {
          if (err) { return cb({handle: (res) => res.status(500).send('Internal server error')}, null); }
          return cb(null, doc);
        });
      });
    } else {
      cb({handle: (res) => res.status(401).send('Must be signed in to save bins.')}, null);
    }
  },
  validUsername(username) {
    if (Object.prototype.toString.call(username) !== '[object String]') {
      return false;
    }
    if (username.length < 6) {
      return false;
    }
    return true;
  }
}
