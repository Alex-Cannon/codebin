const { User } = require('./schema.js');
var passport = require('passport');
var LocalStrategy = require('passport-local');

// Email Authentication Setup
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      // if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

module.exports = {
  passport: passport
};