const User = require('../models/user');

//TODO: find by email with isAuth
exports.get = async (req, res, next) => {
	try {
		const user = await User.find(email);
		res.status(200).json(user);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

//TODO: update with new jobs arr
exports.createOrUpdate = async (req, res, next) => {
	try {
		const filter = { email: req.body.email };

		// await Job.countDocuments(filter, function (err, count) {
		// 	console.log('there are %d matches', count)}); 

		let dbres = await User.findOneAndUpdate(filter, req.body, {
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
