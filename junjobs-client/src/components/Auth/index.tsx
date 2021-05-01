import * as Yup from "yup";
import { useFormik } from "formik";
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
    .required("Password is required")
});

const Auth = ({ show = false, logIn }: IAuthProps) => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: ""
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setStatus }) => {
      setStatus(null);
      try {
        await logIn(values);
        history.push("/");
      } catch (e) {
        setStatus({
          type: "danger",
          text: e.message
        });
      }
    }
  });

  return (
    <Modal show={show} onHide={() => history.push("/")} centered>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AuthForm formik={formik} />
        <div>
          Back to{" "}
          <Button as="a" bsPrefix="unset" onClick={() => history.push("/")}>
            Home Page
          </Button>
        </div>
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
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Auth;
