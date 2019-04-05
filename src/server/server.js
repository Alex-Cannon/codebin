const api = require('./routes/api.js');
const express = require('express');
let app = express();


const PORT = 81 || process.env.PORT;

app.use('/api', api);

app.listen(PORT, () => console.log('App listening on port ' + PORT + '...'));