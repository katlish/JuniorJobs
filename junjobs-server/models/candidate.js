const mongoose = require('mongoose');
const jobType = require('./jobtype.js');

const Schema = mongoose.Schema;


const candidateSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		location: {
			type: String,
		},
		url: {
			type: String,
		},
		yearsOfExperience: {
			type: Number,
			required: true,
		},
		jobs: [jobType],
		isremote: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Candidate', candidateSchema);
