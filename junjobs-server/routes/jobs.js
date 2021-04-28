const express = require('express');
const jobsController = require('../controllers/jobs');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', jobsController.get);

router.post('/', isAuth, jobsController.create);

router.patch('/:id', isAuth, jobsController.update);

module.exports = router;
