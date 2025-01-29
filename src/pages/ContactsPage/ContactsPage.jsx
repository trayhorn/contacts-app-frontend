import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import ModalComponent from "../../components/Modal/Modal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllContacts } from "../../redux/operations";
import { selectToken } from '../../redux/auth/selectors';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
		dispatch(fetchAllContacts(token));
	}, [dispatch, token]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
      <ModalComponent />
    </>
  )
}