import "./FormikForm.scss";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";

type FormikFormType = {
	buttonText: string;
	onSubmit: Function;
	initialValues?: FormValues;
};

export type FormValues = {
	name: string;
	number: string;
};


export default function FormikForm({
	buttonText,
	onSubmit,
	initialValues = { name: "", number: "+38" },
}: FormikFormType) {
	const nameId = nanoid();
	const numberId = nanoid();

	const handleSubmit = (
		values: FormValues,
		actions: FormikHelpers<FormValues>
	) => {
		onSubmit(values);
		actions.resetForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={FormSchema}
		>
			<Form className="contactForm">
				<div className="inputContainer">
					<div className="labelContainer">
						<label className="label" htmlFor={nameId}>
							Name
						</label>
						<ErrorMessage
							className="errorMessage"
							name="name"
							component="span"
						/>
					</div>
					<Field className="input" type="text" name="name" id={nameId} />
				</div>

				<div className="inputContainer">
					<div className="labelContainer">
						<label className="label" htmlFor={numberId}>
							Number
						</label>
						<ErrorMessage
							className="errorMessage"
							name="number"
							component="span"
						/>
					</div>
					<Field className="input" type="text" name="number" id={numberId} />
				</div>

				<button className="submitButton" type="submit">
					{buttonText}
				</button>
			</Form>
		</Formik>
	);
}

const FormSchema = Yup.object({
  name: Yup.string().min(2, "Too Short!").required("This filed is required"),
  number: Yup.string().required("This filed is required"),
});