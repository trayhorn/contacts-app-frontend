import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from './contactsSlice';
import filterReducer from './filterSlice';
import modalReducer from './modalSlice';
import authReducer from './authslice';

export default configureStore({
	reducer: {
		contacts: contactsReducer,
		filter: filterReducer,
		modal: modalReducer,
		auth: authReducer,
	},
});






