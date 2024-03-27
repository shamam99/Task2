const express = require('express');
const router = express.Router();

const { register } = require('../controllers/register');
const { login } = require('../controllers/login');
const { forgetPass } = require('../controllers/forgetPassword');
const { resetPass } = require('../controllers/resetPassword');

router.post('/register', register);
router.post('/login', login);
router.post('/forgetPassword', forgetPass);
router.post('/resetPassword/:token', resetPass);


module.exports = router;
