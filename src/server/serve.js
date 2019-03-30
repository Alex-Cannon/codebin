const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 81;

app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

app.listen(PORT, () => console.log('App listening on port ' + PORT + '...'));