const express = require('express');
const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, userController.get);

router.post('/', isAuth, userController.update);

module.exports = router;
