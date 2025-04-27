import { useSelector, useDispatch } from "react-redux";
import { editContact } from "../../redux/operations";
import { selectIsModalOpen, toggleModal } from "../../redux/modalSlice";
import { selectContactToEdit } from "../../redux/contactsSlice";
import FormikForm from "../FormikForm/FormikForm";
import { selectToken } from "../../redux/auth/selectors";
import Modal from "react-modal";
import { FormValues } from "../FormikForm/FormikForm";
import { AppDispatch } from "../../redux/store";
import { Contact as ContactType } from "../../redux/contactsSlice";


export default function ModalComponent() {
	const token = useSelector(selectToken);
	const modalState = useSelector(selectIsModalOpen);
	const {
		_id = "",
		name = "",
		number = "",
	} = useSelector(selectContactToEdit) as Partial<ContactType>;

  const dispatch = useDispatch<AppDispatch>();

  Modal.setAppElement("#root");

  const handleSubmit = (values: FormValues) => {
		if (token) {
			dispatch(editContact({ _id, contact: { ...values }, token }));
		}
		dispatch(toggleModal(false));
	};

	return (
		<Modal
			isOpen={modalState}
			onRequestClose={() => dispatch(toggleModal(false))}
			contentLabel="Modal"
			className="modal"
		>
			<FormikForm
				buttonText="Save"
				onSubmit={handleSubmit}
				initialValues={{ name, number }}
			/>
		</Modal>
	);
}