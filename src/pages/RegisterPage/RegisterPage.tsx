import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { registerUser } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";
import { selectError } from "../../redux/auth/selectors";
import { toast } from "react-toastify";
import { resetError } from "../../redux/auth/slice";
import './RegisterPage.scss';

export default function RegisterForm() {
	const dispatch = useDispatch<AppDispatch>();
	const error = useSelector(selectError);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(resetError());
		}
	}, [error]);

  return (
		<Formik
			initialValues={{ name: '', email: '', password: '' }}
      onSubmit={(values, actions) => {
        dispatch(registerUser(values))
        actions.resetForm();
      }}
		>
			<Form className="form">
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