const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', authController.signUp);

router.post('/login', authController.login);

router.get('/confirmation/:confirmationCode', authController.confirmationGet);

router.post('/resend', authController.resendTokenPost);

module.exports = router;
