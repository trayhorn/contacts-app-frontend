import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import ModalComponent from '../../components/Modal/Modal';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllContacts } from "../../redux/operations";
import { AppDispatch } from '../../redux/store';

export default function ContactsPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
		dispatch(fetchAllContacts());
	}, [dispatch]);

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