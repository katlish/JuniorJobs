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

exports.create = async (req, res, next) => {
	try {
		const { name, description, location, url, yearsOfExperience, jobs, isremote } = req.body;
		const createdCandidate = await Candidate.create({
			name, 
            description, 
            location, 
            url, 
            yearsOfExperience, 
            jobs, 
            isremote
		});
		res.status(201).json(createdCandidate);
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
		const updatedCandidate = await Candidate.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.status(200).json(updatedCandidate);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};