import "../../pages/RegisterPage/RegisterPage.scss";
import { Formik, Form, Field } from "formik";
import { loginUser } from "../../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { selectError } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { resetError } from "../../redux/auth/slice";
import { toast } from "react-toastify";

export default function LoginForm() {
	const dispatch = useDispatch<AppDispatch>();
	const error = useSelector(selectError);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(resetError());
		};
	}, [error]);

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			onSubmit={(values, actions) => {
				dispatch(loginUser(values));
				actions.resetForm();
			}}
		>
			<Form className="form">
				<label>
					Email
					<Field autoComplete="true" type="email" name="email" />
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