import { Form , DropdownButton, Dropdown} from "react-bootstrap";
import { IAuthFormProps } from "../../types";
import { userRole } from "../../store/constants/constants";

const AuthForm = ({ formik, type="login" }: IAuthFormProps) => {
  return (
    <Form noValidate>
      <Form.Group controlId="email" >
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Email"
          type="text"
          isInvalid={formik.touched.email && formik.errors.email ? true : false}
          isValid={formik.touched.email && !formik.errors.email}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Password"
          type="password"
          isInvalid={
            formik.touched.password && formik.errors.password ? true : false
          }
          isValid={formik.touched.password && !formik.errors.password}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      {type === "signup" && (
        <>
        <Form.Group controlId="firstname">
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.firstname}
            placeholder="First Name"
            type="text"
            isInvalid={
              formik.touched.firstname && formik.errors.firstname ? true : false
            }
            isValid={formik.touched.firstname && !formik.errors.firstname}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {formik.errors.firstname}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.lastname}
            placeholder="Last Name"
            type="text"
            isInvalid={
              formik.touched.lastname && formik.errors.lastname ? true : false
            }
            isValid={formik.touched.lastname && !formik.errors.lastname}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {formik.errors.lastname}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-5">
            <Form.Label>Your Role In This Site</Form.Label>
            <DropdownButton
                variant="dark"
                title={formik.values.role}
                id="role"
            >
              <Dropdown.Item onClick={() => formik.setFieldValue("role", userRole.CANDIDATE)}>
                Candidate
              </Dropdown.Item>
              <Dropdown.Item onClick={() => formik.setFieldValue("role", userRole.HR)}>
                HR
              </Dropdown.Item>
          </DropdownButton>
        </Form.Group>
      </>
      )}
    </Form>
  );
};

export default AuthForm;
