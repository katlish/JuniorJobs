const Job = require('../models/job');

exports.get = async (req, res, next) => {
	try {
		const jobs = await Job.find();
		res.status(200).json(jobs);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.createOrUpdate = async (req, res, next) => {
	try {
		const filter = { externalId: req.body.externalId };

		// await Job.countDocuments(filter, function (err, count) {
		// 	console.log('there are %d matches', count)}); 

		let dbres = await Job.findOneAndUpdate(filter, req.body, {
			new: true,
			upsert: true,
			rawResult: true // Return the raw result from the MongoDB driver
		});

		// console.log("updatedExisting - ", dbres.lastErrorObject.updatedExisting);
		res.status(201).json(dbres.value);

		} catch (err) {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		}
};
