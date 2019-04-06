const router = require('express').Router();

// Require endpoints
const postUser = require('./user/addUser');
const login = require('./user/login.js');

// API Endpoints
// USER
router.use(postUser);
router.use(login);
// SEARCH

module.exports = router;