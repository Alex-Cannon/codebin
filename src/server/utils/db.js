// Handles DB Connections
var mongoose = require('mongoose');
var connected = false;

module.exports = {
  connected: function (cb) {
    if (connected) {
      return cb(false);
    } else {
      mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, autoIndex: false }, function (err) {
        if (err) { cb(err); }
        console.log('DB Connection OK.');
        connected = true;
        return cb(false);
      });
    }
  }
};