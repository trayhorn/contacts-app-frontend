import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/operations";
import { selectAllContacts } from "../../redux/contactsSlice";
import { selectToken } from "../../redux/auth/selectors";
import FormikForm from "../FormikForm/FormikForm";
import { ToastContainer, toast } from "react-toastify";
import { AppDispatch } from "../../redux/store";
import { FormValues } from "../FormikForm/FormikForm";

export default function ContactForm() {
	const dispatch = useDispatch<AppDispatch>();
	const token = useSelector(selectToken);

	const allContacts = useSelector(selectAllContacts);

	const handleSubmit = (values: FormValues) => {
		if (allContacts.find((el) => el.number === values.number)) {
			toast.error("Phone number already exists!");
			return;
		}
		if (token) dispatch(addContact({ contact: { ...values }, token }));
	};

	return (
		<>
			<FormikForm buttonText="Add contact" onSubmit={handleSubmit} />
			<ToastContainer />
		</>
	);
}