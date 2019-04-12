const router = require('express').Router();

// Require endpoints
const postUser = require('./user/addUser');
const signin = require('./user/signin.js');
const signout = require('./user/signout.js');
const getUser = require('./user/getUser.js');

// API Endpoints
// USER
router.use(postUser);
router.use(signin);
router.use(signout);
router.use(getUser);
router.get('/getbin', function (req, res) {
  return res.send('<!DOCTYPE html><html><body>I am embedded!</body></html>');
});
// SEARCH

module.exports = router;