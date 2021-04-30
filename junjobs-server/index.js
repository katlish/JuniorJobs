const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// routes
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');
const candidatesRoutes = require('./routes/candidates');

require('dotenv').config();

const app = express();

app.use(
	cors({
		origin: ['http://localhost:3000'],
		credentials: true,
	}),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/jobs', jobsRoutes);
app.use('/candidates', candidatesRoutes);

app.use((error, req, res, next) => {
	const { statusCode, message, data } = error;
	res.status(statusCode).json({ message, data });
});

mongoose
	.connect(
		process.env.DB_CONNECTION,
		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
	)
	.then((result) => {
		app.listen(4000, () => console.log('Server is running on 4000'));
	})
	.catch((e) => console.log('err', e));
