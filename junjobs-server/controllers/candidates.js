const Candidate = require('../models/candidate');

exports.get = async (req, res, next) => {
	try {
		const candidates = await Candidate.find();
		res.status(200).json(candidates);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.createOrUpdate = async (req, res, next) => {
	try {
		const filter = { email: req.body.email };

		let dbres = await Candidate.findOneAndUpdate(filter, req.body, {
			new: true,
			upsert: true,
			rawResult: true // Return the raw result from the MongoDB driver
		});

		res.status(201).json(dbres.value);

		} catch (err) {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		}
};