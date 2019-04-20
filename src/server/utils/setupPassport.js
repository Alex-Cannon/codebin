var { User } = require('./schema.js');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

// Email Authentication Setup
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (bcrypt.compareSync(password, user.password)) { return done(null, user); }
      return done({ message: 'Bad Username/Password.'});
    });
  }
));

// _id stored in session
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

// user fetched from _id in session
passport.deserializeUser(function (_id, done) {
  User.findById(_id, {_id: 1, username: 1, profilePic: 1}, function (err, user) {
    done(err, user);
  });
});

module.exports = {
  passport: passport
};