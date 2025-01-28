import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../redux/modalSlice";
import { editContact } from "../../redux/operations";
import { selectIsModalOpen } from "../../redux/modalSlice";
import { selectContactToEdit } from "../../redux/contactsSlice";
import FormikForm from "../FormikForm/FormikForm";
import Modal from "react-modal";


export default function ModalComponent() {
	const token = useSelector(state => state.auth.token);
	const modalState = useSelector(selectIsModalOpen);
	const { id, name, number } = useSelector(selectContactToEdit);

  const dispatch = useDispatch();

  Modal.setAppElement("#root");

  const handleSubmit = (values) => {
    dispatch(editContact({id, contact: {...values}, token}));
    dispatch(toggleModal(false));
  }

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