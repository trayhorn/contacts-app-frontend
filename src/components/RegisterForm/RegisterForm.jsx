import { Formik, Form, Field } from "formik";
import './RegisterForm.scss';
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/authoperations";

export default function RegisterForm() {
  const dispatch = useDispatch();

  return (
		<Formik
			initialValues={{ name: '', email: '', password: '' }}
      onSubmit={(values, actions) => {
        dispatch(registerUser(values))
        actions.resetForm();
      }}
		>
			<Form className="registerForm">
        <label>
          Name
          <Field type="text" name="name" />
        </label>
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