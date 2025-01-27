import "../RegisterForm/RegisterForm.scss";
import { Formik, Form, Field } from "formik";
import { loginUser } from "../../redux/authoperations";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, actions) => {
              dispatch(loginUser(values));
              actions.resetForm();
            }}
    >
      <Form className="registerForm">
        <label>
          Email
          <Field type="email" name="email" />
        </label>
        <label>
          Password
          <Field type="password" name="password" />
        </label>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
