import { Form , DropdownButton, Dropdown} from "react-bootstrap";
import { IAuthFormProps } from "../../types";

const AuthForm = ({ formik, type="login" }: IAuthFormProps) => {
  return (
    <Form noValidate>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="type here"
          type="text"
          isInvalid={formik.touched.email && formik.errors.email ? true : false}
          isValid={formik.touched.email && !formik.errors.email}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="type here"
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
          <Form.Label>First Name</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.firstname}
            placeholder="type here"
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
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.lastname}
            placeholder="type here"
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
        <Form.Group>
            <Form.Label>Your Role In This Site</Form.Label>
            <DropdownButton
                variant="outline-secondary"
                title={formik.values.role}
                id="role"
                
            >
              <Dropdown.Item onClick={() => formik.setFieldValue("role", "candidate")}>
                Candidate
              </Dropdown.Item>
              <Dropdown.Item onClick={() => formik.setFieldValue("role", "hr")}>
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
