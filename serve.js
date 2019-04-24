require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

// Constants
let app = express();
const PORT = process.env.PORT || 80;

// Configure App
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./build'));

// Connect to DB.
mongoose.connection.on('open', () => {
  // Configure app/passport
  app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  require('./src/server/utils/setupPassport.js');

  // Serve RESTful API
  app.use('/api', require('./src/server/routes/api.js'));

  // Serve App
  app.use('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build/index.html'));
  });

  // Listen on PORT
  app.listen(PORT, () => console.log('App listening on port ' + PORT + '...'));
});
