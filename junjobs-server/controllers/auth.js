const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

const User = require('../models/user');
const Token = require('../models/token');

exports.signUp = async (req, res, next) => {
	const { email, password, firstname, lastname, role } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			const error = new Error('User with the email already exists');
			error.statusCode = 409;
			throw error;
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		if (hashedPassword) {
			const user = new User({
				email: email,
				password: hashedPassword,
				firstname, 
				lastname, 
				role
			});
			const newUser = await user.save();

			// Create a verification token for this user
			const token = new Token({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
 
			// Save the verification token
			const tokenResult = await token.save();

			const sendgridResult = await sgMail.setApiKey(process.env.SENDGRID_API_KEY);
			  
			const mailDetails = {
				from: 'katia.lishnevsky@gmail.com',
				to: newUser.email,
				subject: 'JJ Account Verification Token',
				text: 'text',
				html: `<h1>Email Confirmation</h1>
				<h2>Hello ${newUser.firstname}</h2>
				<p>Thank you for registration. Please confirm your email by clicking on the following link</p>
				<a href=http://localhost:3000/confirm/${tokenResult.token}> Click here</a>
				</div>`
			}

			const transporterResult = await sgMail.send(mailDetails);  

			res.status(201).json({ message: `A verification email has been sent to ${newUser.email}.` });
		}
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

//TODO: trim whitespaces
exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	let loggedinUser;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			const error = new Error('A user with this email was not found.');
			error.statusCode = 401;
			throw error;
		}
		loggedinUser = user;

		if (!user.isEmailVerified){
			const error = new Error('Your account has not been verified.');
			error.statusCode = 401;
			throw error;
		} 
 
		const isEqual = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			const error = new Error('Wrong password or email!');
			error.statusCode = 401;
			throw error;
		}
		// generating web token
		const token = jwt.sign(
			{
				email: loggedinUser.email,
				userId: loggedinUser._id.toString(),
				role: loggedinUser.role,
				jobs: loggedinUser.jobs,
				candidates: loggedinUser.candidates,
				firstname: loggedinUser.firstname,
				lastname: loggedinUser.lastname
			},
			process.env.JWT_PRIVATE_KEY,
			{ expiresIn: process.env.JWT_TIME_EXPIRATION },
		);
		res.status(200).json({
			token,
			email: loggedinUser.email,
			userId: loggedinUser._id.toString(),
			role: loggedinUser.role,
			jobs: loggedinUser.jobs,
			candidates: loggedinUser.candidates,
			firstname: loggedinUser.firstname,
			lastname: loggedinUser.lastname
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.confirmationGet = async (req, res, next) => {
	const confirmationCode = req.params.confirmationCode;
    try {
		if (!confirmationCode) {
			const error = new Error('ConfirmationCode is missing!');
			error.statusCode = 400;
			throw error;
		}
		// Find a matching token
		const tokenResult = await Token.findOne({ token: confirmationCode });
		if (!tokenResult){
			const error = new Error('We were unable to find a valid token. Your token may have expired.');
			error.statusCode = 400;
			throw error;
		}
		// If we found a token, find a matching user
		const userResult = await User.findOne({ _id: tokenResult._userId._id });
		if (!userResult){
			const error = new Error('We were unable to find a user for this token.');
			error.statusCode = 400;
			throw error;
		} 
	
		if (userResult.isEmailVerified){ 
			const error = new Error('This user has already been verified.');
			error.statusCode = 400;
			throw error;
		} 

		// Verify and save the user
		userResult.isEmailVerified = true;
		await userResult.save();
		
		res.status(201).json({ message: `The account has been verified. Please log in.`});
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error);
	}
};

exports.resendTokenPost = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });
 
    // Check for validation errors    
    const errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);
 
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            const transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
            const mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
 
    });
};