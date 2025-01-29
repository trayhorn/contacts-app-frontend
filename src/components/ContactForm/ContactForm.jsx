import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/operations";
import { selectAllContacts } from "../../redux/contactsSlice";
import { selectToken } from "../../redux/auth/selectors";
import FormikForm from "../FormikForm/FormikForm";

export default function ContactForm() {
	const dispatch = useDispatch();
	const token = useSelector(selectToken);

	const allContacts = useSelector(selectAllContacts);

	const handleSubmit = (values) => {
		if (allContacts.find(el => el.number === values.number)) {
			alert('Contact already exists');
			return;
		}
		dispatch(addContact({ contact: {...values}, token }));
	};

	return (
		<FormikForm buttonText="Add contact" onSubmit={handleSubmit} />
	);
}