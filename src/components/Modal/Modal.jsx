import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../redux/modalSlice";
import { editContact } from "../../redux/operations";
import { selectIsModalOpen } from "../../redux/modalSlice";
import { selectContactToEdit } from "../../redux/contactsSlice";
import FormikForm from "../FormikForm/FormikForm";
import Modal from "react-modal";
import { selectToken } from "../../redux/auth/selectors";


export default function ModalComponent() {
	const token = useSelector(selectToken);
	const modalState = useSelector(selectIsModalOpen);
	const { _id, name, number } = useSelector(selectContactToEdit);

  const dispatch = useDispatch();

  Modal.setAppElement("#root");

  const handleSubmit = (values) => {
    dispatch(editContact({_id, contact: {...values}, token}));
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