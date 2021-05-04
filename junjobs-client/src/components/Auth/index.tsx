import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from 'react';
import AuthForm from "./AuthForm";
import { useHistory } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";
import { IAuthProps } from "../../types";

export const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email()
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(6, "at least 6 characters")
    .required("Password is required"),
  firstname: Yup.string(),
  lastname: Yup.string(),
  role: Yup.string()
});

const Auth = ({ show = false, logIn, signUp }: IAuthProps) => {
	const [type, setType] = useState('signup');

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      role: "candidate",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setStatus }) => {
      console.log({values});
      setStatus(null);
      try {
        if (type === 'signup') {
					await signUp(values);
          setStatus({
            type: 'success',
            text: 'Success! Now you can Log In.',
          });
				} 
				if (type === 'login') {
					await logIn(values);
          history.push("/");
				} 
      } catch (e) {
				console.log('e', e);
        setStatus({
          type: "danger",
          text: e.message
        });
      }
    }
  });

  const changeType = () => {
		setType(type === 'signup' ? 'login' : 'signup');
		formik.resetForm();
	};

  return (
    <Modal show={show} onHide={() => history.push("/")} centered>
      <Modal.Header closeButton>
        <Modal.Title>{type === 'signup' ? 'Sign Up' : 'Log In'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AuthForm formik={formik} type={type}/>
        {type === 'signup' ? (
					<div>
						Already have an account?{' '}
						<Button as="a" bsPrefix="unset" onClick={changeType}>
							Login
						</Button>
					</div>
				) : (
					<div>
						Back to{' '}
						<Button as="a" bsPrefix="unset" onClick={changeType}>
							Signup
						</Button>
					</div>
				)}
        {formik.status && (
          <div className={`text-${formik.status.type}`}>
            {formik.status.text}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {formik.isSubmitting && (
          <Spinner variant="info" animation="border" as="span" />
        )}
        <Button
          variant="success"
          onClick={() => formik.handleSubmit()}
          disabled={formik.isSubmitting}
        >
          {type === 'signup' ? 'Sign Up' : 'Log In'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Auth;
