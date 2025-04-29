import { Formik, Form, Field } from "formik";
import "./AuthForm.scss";

type FormValues = {
	name?: string;
	email: string;
	password: string;
};

type AuthFormType = {
  handleSubmit: (values: FormValues) => void;
  initialValues: FormValues
}

export default function AuthForm({ handleSubmit, initialValues }: AuthFormType) {

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, actions) => {
				handleSubmit(values);
				actions.resetForm();
			}}
		>
			<Form className="form">
				{Object.keys(initialValues).includes("name") && (
					<label>
						Name
						<Field type="text" name="name" />
					</label>
				)}
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
