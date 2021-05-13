const User = require('../models/user');

exports.get = async (req, res, next) => {
	try {
		const {role, jobs, candidates, email} = await User.findOne({_id: req.user.userId});
		res.status(200).json({role, jobs, candidates, email});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

//TODO: update with new jobs arr
exports.update = async (req, res, next) => {
	try {
		const filter = { _id: req.user.userId };

		let dbres = await User.updateOne(filter, req.body, {
			upsert: false
		});

		res.status(201).json({ message: 'success' });

		} catch (err) {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		}
};
