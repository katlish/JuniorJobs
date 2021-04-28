const mongoose = require('mongoose');
const jobType = require('./jobtype.js');

const Schema = mongoose.Schema;

const jobSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
        company: {
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
		type: {
			type: String,
		},
        how_to_apply: {
			type: String,
		},
        company_logo: {
			type: String,
		},
		jobs: [jobType],
		isremote: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Job', jobSchema);
