const express = require('express');
const router = express.Router();
const { googleSignIn } = require('../controllers/authController');

// @route   POST /api/auth/google-signin
router.post('/google-signin', googleSignIn);

module.exports = router;
