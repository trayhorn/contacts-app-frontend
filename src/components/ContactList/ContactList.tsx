import { selectFilteredContacts } from "../../redux/contactsSlice";
import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import ErrorMessage from "../Error/error";
import { ThreeDots } from "react-loader-spinner";
import "./ContactList.scss";
import { RootState } from "../../redux/store";

export default function ContactList() {
	const { items, isLoading, error } = useSelector(
		(state: RootState) => state.contacts
	);
	const filteredContacts = useSelector(selectFilteredContacts);

	return (
		<>
			{items && (
				<ul className="contactList">
					{filteredContacts?.map((el) => {
						return (
							<li className="item" key={el._id}>
								<Contact contact={el} />
							</li>
						);
					})}
				</ul>
			)}
			{isLoading && (
				<div className="loaderOverlay">
					<ThreeDots
						visible={true}
						height="80"
						width="80"
						color="#4CAF50"
						ariaLabel="three-dots-loading"
						wrapperClass="loader"
					/>
				</div>
			)}
			{error && <ErrorMessage />}
		</>
	);
}