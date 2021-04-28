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


exports.create = async (req, res, next) => {
	try {
		const { title, company, description, location, url, type, how_to_apply, company_logo, jobs, isremote } = req.body;
		const createdJob = await Job.create({
			title,
			company, 
			description, 
			location, 
			url, 
			type, 
			how_to_apply, 
			company_logo, 
			jobs, 
			isremote
		});
		res.status(201).json(createdJob);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.update = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.status(200).json(updatedJob);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};