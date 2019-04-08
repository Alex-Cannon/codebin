const router = require('express').Router();

// Require endpoints
const postUser = require('./user/addUser');
const signin = require('./user/signin.js');
const signout = require('./user/signout.js');

// API Endpoints
// USER
router.use(postUser);
router.use(signin);
router.use(signout);
// SEARCH

module.exports = router;