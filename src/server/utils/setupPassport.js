var { User } = require('./schema.js');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const startup = function () {
  // Email Authentication Setup
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username }, function (err, user) {
        console.log('authenticating?');
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (bcrypt.compareSync(password, user.password)) { return done(null, user); }
        return done({ message: 'Bad Username/Password.'});
      });
    }
  ));

  // _id stored in session
  passport.serializeUser(function (user, done) {
    console.log('hit');
    done(null, user._id);
  });

  // user fetched from _id in session
  passport.deserializeUser(function (_id, done) {
    console.log('deserializing');
    User.findById(_id, function (err, user) {
      done(err, user);
    });
  });
}


module.exports = {
  setup: function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
    startup();
  },
  passport: passport
};