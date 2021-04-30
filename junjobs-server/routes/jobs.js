const express = require('express');
const jobsController = require('../controllers/jobs');
// const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', jobsController.get);

router.post('/', jobsController.createOrUpdate);

module.exports = router;
