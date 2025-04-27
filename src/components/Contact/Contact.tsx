import "./Contact.scss";
import { FaPhoneAlt } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/modalSlice";
import { passEditId } from "../../redux/contactsSlice";
import { deleteContact } from "../../redux/operations";
import { selectToken } from "../../redux/auth/selectors";
import { Contact as ContactType } from "../../redux/contactsSlice";
import { AppDispatch } from "../../redux/store";

type ContactProps = {
	contact: ContactType;
}


export default function Contact({ contact: { _id, name, number } }: ContactProps) {
	const dispatch = useDispatch<AppDispatch>();
	const token = useSelector(selectToken);

	const handleEditClick = () => {
		dispatch(passEditId({ _id, name, number }));
		dispatch(toggleModal(true));
	};

	return (
		<div className="contact">
			<p className="info">
				<BsPersonFill />
				{name}
			</p>
			<p className="info">
				<FaPhoneAlt />
				{number}
			</p>
			<button onClick={handleEditClick} className="button">
				<MdEdit />
			</button>
			<button
				className="button"
				onClick={() => {
					if (token) dispatch(deleteContact({ _id, token }));
				}}
			>
				<MdDelete />
			</button>
		</div>
	);
}
