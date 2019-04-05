const router = require('express').Router();

// Require endpoints
const postUser = require('./user/addUser');

// API Endpoints
router.use(postUser);

module.exports = router;