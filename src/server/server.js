require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

// Constants
let app = express();
const PORT = 81 || process.env.API_PORT;

// Configure App
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to DB.
mongoose.connection.on('open', () => {
  // Configure app/passport
  app.use(session({
    secret: 'SOME SECRET123@#$',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  require('./utils/setupPassport.js');

  // Serve RESTful API
  app.use('/api', require('./routes/api.js'));

  // Listen on PORT
  app.listen(PORT, () => console.log('App listening on port ' + PORT + '...'));
});
