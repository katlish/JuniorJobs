import { Form, Button, Spinner } from 'react-bootstrap';
import { validationSchema } from './utils/Validations';
import { useFormik } from 'formik';
import CountriesList from '../components/CoutriesList/CountriesList';
import { IAddCandidatePageProps , Candidate, Country } from '../types';


//FIXME: reset error in candidates state
const AddCandidatePage = ({email, submitHandler}: IAddCandidatePageProps) => {
    
    const initialValues = {
        email,
        name: '',
        yearsOfExperience: 0,
        jobType: {
            fullstack: false,
            frontend: false,
            backend: false
        },
        location: null,
        description: '',
        url: '',
        isremote: false
    }

    const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setStatus, resetForm }) => {
			const candidate = createCandidateObj(values);

			setStatus(null);
			try {
				submitHandler(candidate);
				setStatus({
					type: 'success',
					text: 'Success',
				});
				resetForm();
			} catch (e) {
				setStatus({
					type: 'danger',
					text: e.message || e.response.data.message,
				});
			}
		},
	});
    console.log(formik.values);

    const onCountryChange = (country: Country | null) => {
        formik.setFieldValue("location", country);
    }

	return (
		<Form noValidate onSubmit={formik.handleSubmit}>
			<Form.Group controlId="email">
				<Form.Label>Email</Form.Label>
				<Form.Control
					value={formik.values.email}
                    readOnly
				></Form.Control>
			</Form.Group>
            <Form.Group controlId="name">
				<Form.Label>Name</Form.Label>
				<Form.Control
					onChange={formik.handleChange}
					value={formik.values.name}
					placeholder="type here"
					type="text"
					isInvalid={!!(formik.touched.name && formik.errors.name)}
					isValid={formik.touched.name && !formik.errors.name}
				></Form.Control>
				<Form.Control.Feedback type="invalid">
					{formik.errors.name}
				</Form.Control.Feedback>
			</Form.Group>
            <Form.Group controlId="yearsOfExperience">
				<Form.Label>Years Of Experience</Form.Label>
				<Form.Control
					onChange={formik.handleChange}
					value={formik.values.yearsOfExperience}
					type="text"
					isInvalid={!!(formik.touched.yearsOfExperience && formik.errors.yearsOfExperience)}
					isValid={formik.touched.yearsOfExperience && !formik.errors.yearsOfExperience}
				></Form.Control>
				<Form.Control.Feedback type="invalid">
					{formik.errors.yearsOfExperience}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group>
                <Form.Check inline type="checkbox" id="fullstack" label="fullstack" onChange={() => formik.setFieldValue("jobType", {...formik.values.jobType, fullstack: !formik.values.jobType.fullstack})}/>
                <Form.Check inline type="checkbox" id="backend"label="backend" onChange={() => formik.setFieldValue("jobType", {...formik.values.jobType, backend: !formik.values.jobType.backend})}/>
                <Form.Check inline type="checkbox" id="frontend"label="frontend" onChange={() => formik.setFieldValue("jobType", {...formik.values.jobType, frontend: !formik.values.jobType.frontend})}/>
            </Form.Group>
            <Form.Group>
				<Form.Label>Location</Form.Label>
                <CountriesList country={formik.values.location} setCountry={onCountryChange}/>
			</Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3}
                    onChange={formik.handleChange}
					value={formik.values.description}
					type="text"
					isInvalid={!!(formik.touched.description && formik.errors.description)}
					isValid={formik.touched.description && !formik.errors.description}
                 />
                 <Form.Control.Feedback type="invalid">
					{formik.errors.description}
				</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="url">
				<Form.Label>URL</Form.Label>
				<Form.Control
					onChange={formik.handleChange}
					value={formik.values.url}
					placeholder="type here"
					type="text"
					isInvalid={!!(formik.touched.url && formik.errors.url)}
					isValid={formik.touched.url && !formik.errors.url}
				></Form.Control>
				<Form.Control.Feedback type="invalid">
					{formik.errors.url}
				</Form.Control.Feedback>
			</Form.Group> 
		    <Form.Group controlId="isremote">
                <Form.Check inline type="checkbox" label="Is Remote" id="isremote" onChange={() => formik.setFieldValue("isremote", !formik.values.isremote)}/>
            </Form.Group>
			
			<div className="d-flex justify-content-end align-items-center">
				{formik.status && (
					<div className={`text-${formik.status.type} mr-auto`}>
						{formik.status.text}
					</div>
				)}
				{formik.isSubmitting && (
					<Spinner animation="border" variant="info" className="mr-2" />
				)}
				<Button
					disabled={formik.isSubmitting}
					variant="success"
					type="submit"
				>
					Submit
				</Button>
			</div>
		</Form>
	);
}



const createCandidateObj = (values: any) => {
    const jobsArr = []; 
    const location: (Country | null) = values.location;

    values.jobType.backend && jobsArr.push("backend");
    values.jobType.frontend && jobsArr.push("frontend");
    values.jobType.fullstack && jobsArr.push("fullstack");
    
    const candidate: Candidate = {
        email: values.email,
        description: values.description,
        jobs: jobsArr,
        location:  location ? location!.name : null,
        name: values.name,
        url: values.url,
        yearsOfExperience: values.yearsOfExperience,
        isremote: values.isremote
    }
    console.log("VALUES",{candidate});

    return candidate;
}

export default AddCandidatePage;