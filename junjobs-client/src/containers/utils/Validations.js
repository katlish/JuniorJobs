import * as Yup from 'yup';

export const validationSchema = Yup.object({
	email: Yup.string().email().required('Email is required'),
	name: Yup.string().required('Name is required'),
	yearsOfExperience: Yup.number().required('Years of experience is required'),
	jobType: Yup.object(),
	description: Yup.string().max(100),
	url: Yup.string().url(),
	isremote: Yup.boolean()
});
