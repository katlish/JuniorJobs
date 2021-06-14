import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from 'react';
import AuthForm from "./AuthForm";
import { useHistory } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";
import { IAuthProps } from "../../types"; 
import {userRole}  from "../../store/constants/constants";
import "./Auth.css";

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

const Auth = ({ show = false, logIn, signUp, type = 'login' }: IAuthProps) => {
	const [authType, setType] = useState(type);

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      role: userRole.CANDIDATE,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setStatus }) => {
      console.log({values});
      setStatus(null);
      try {
        if (authType === 'signup') {
					await signUp(values);
          setStatus({
            type: 'success',
            text: 'Success! Now you can Log In.',
          });
				} 
				if (authType === 'login') {
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
		setType(authType === 'signup' ? 'login' : 'signup');
		formik.resetForm();
	};

  return (
    <Modal show={show} onHide={() => history.push("/")} centered>
      <Modal.Header closeButton>
        <Modal.Title>{authType === 'signup' ? 'Sign Up' : 'Log In'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AuthForm formik={formik} type={authType}/>
        
        {formik.status && (
          <div className={`text-${formik.status.type}`}>
            {formik.status.text}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        {authType === 'signup' ? (
					<div>
						Already have an account?{' '}
						<Button className="AuthLink" as="a" bsPrefix="unset" onClick={changeType}>
							Login
						</Button>
					</div>
				) : (
					<div>
						Don't have an account?{' '}
						<Button className="AuthLink" as="a" bsPrefix="unset" onClick={changeType}>
							Signup
						</Button>
					</div>
				)}

        {formik.isSubmitting && (
          <Spinner variant="info" animation="border" as="span" />
        )}
        <Button
          variant="success"
          onClick={() => formik.handleSubmit()}
          disabled={formik.isSubmitting}
        >
          {authType === 'signup' ? 'Sign Up' : 'Log In'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Auth;
