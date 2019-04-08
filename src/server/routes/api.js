const router = require('express').Router();

// Require endpoints
const postUser = require('./user/addUser');
const signin = require('./user/signin.js');

// API Endpoints
// USER
router.use(postUser);
router.use(signin);
// SEARCH

module.exports = router;