import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/auth/operations";
import { AppDispatch } from "../redux/store";
import { selectError } from "../redux/auth/selectors";
import { toast } from "react-toastify";
import { resetError } from "../redux/auth/slice";
import AuthForm from "../components/AuthForm/AuthForm";

export default function RegisterPage() {
	const dispatch = useDispatch<AppDispatch>();
	const error = useSelector(selectError);

	const initialValues = {
		name: "",
		email: "",
		password: "",
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(resetError());
		}
	}, [error]);

	return (
		<AuthForm
			handleSubmit={(values) => dispatch(registerUser(values))}
			initialValues={initialValues}
		/>
	);
}
