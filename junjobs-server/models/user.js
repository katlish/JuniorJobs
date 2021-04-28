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
			type: Schema.Types.ObjectId,
			ref: 'Job',
		},
	],
	candidates: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Candidate',
		},
	],
});

module.exports = mongoose.model('User', userSchema);
