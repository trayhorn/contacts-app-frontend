import "./Contact.scss";
import PropTypes from "prop-types";
import { FaPhoneAlt } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/modalSlice";
import { passEditId } from "../../redux/contactsSlice";
import { deleteContact } from "../../redux/operations";

export default function Contact({ contact: {id, name, number } }) {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);

	const handleEditClick = () => {
		dispatch(passEditId({id, name, number}));
		dispatch(toggleModal(true));
	}

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
			<button
				onClick={handleEditClick}
				className="button">
				<MdEdit />
			</button>
			<button className="button" onClick={() => {
				dispatch(deleteContact({id, token}));
			}}>
				<MdDelete />
			</button>
		</div>
	);
}

Contact.propTypes = {
	contact: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
		number: PropTypes.string,
	})
};
