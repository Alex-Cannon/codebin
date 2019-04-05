const axios = require('axios');

module.exports = function (json, then, err) {
  axios.post('/api/adduser', json)
    .then(then)
    .catch(err);
}