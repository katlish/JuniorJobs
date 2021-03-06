const express = require('express');
const candidatesController = require('../controllers/candidates');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', candidatesController.get);

router.post('/', isAuth, candidatesController.createOrUpdate);

module.exports = router;
