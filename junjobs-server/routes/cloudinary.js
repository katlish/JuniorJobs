const express = require('express');
const cloudinaryController = require('../controllers/cloudinary');
// const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', cloudinaryController.get);

router.post('/', cloudinaryController.upload);

module.exports = router;
