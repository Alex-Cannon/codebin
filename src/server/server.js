require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/db.js');
const api = require('./routes/api.js');

// Constants
let app = express();
const PORT = 81 || process.env.API_PORT;

// Parse JSON and Form data
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to DB.
db.connected((err) => {
  if (err) { throw err; }

  // Serve RESTful API
  app.use('/api', api);

  // Listen on PORT
  app.listen(PORT, () => console.log('App listening on port ' + PORT + '...'));
});
