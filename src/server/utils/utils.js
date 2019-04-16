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
  postBin: ({ name, html, css, js }, cb) => {
    Bin.create({ name, html, css, js }, (err, doc) => {
      console.log(err);
      if (err) { return cb({handle: (res) => res.status(500).send('Internal server error.')}, null) }
      if (!doc) { return cb({handle: (res) => res.status(400).send('Doc not found')}, null) }
      return cb(null, doc);
    });
  }
}
