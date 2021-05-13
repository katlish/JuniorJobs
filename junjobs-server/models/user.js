const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	firstname: {
		type: String,
	},
	lastname: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['candidate', 'hr'],
		default: 'candidate',
	},
	jobs: [
		{
			type: String,
			ref: 'Job',
		},
	],
	candidates: [
		{
			type: String,
			ref: 'Candidate',
		},
	],
});

module.exports = mongoose.model('User', userSchema);
