import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchAllContacts, addContact, deleteContact, editContact } from "./operations";
import { selectFilterValue } from "./filterSlice";

const allPending = [
	fetchAllContacts.pending,
	addContact.pending,
	deleteContact.pending,
	editContact.pending,
];
const allRejected = [
	fetchAllContacts.rejected,
	addContact.rejected,
	deleteContact.rejected,
	editContact.rejected
]

export const contactsSlice = createSlice({
	name: "contacts",
	initialState: {
    items: [],
    isLoading: false,
    error: null,
    contactToEdit: {}
  },
  reducers: {
    passEditId: (state, action) => {
      state.contactToEdit = action.payload;
    }
  },
  extraReducers: builder => {
    builder
			.addCase(fetchAllContacts.fulfilled, (state, action) => {
				state.error = null;
				state.items = action.payload;
				state.isLoading = false;
			})
			.addCase(addContact.fulfilled, (state, action) => {
				state.error = null;
				state.items.push(action.payload);
				state.isLoading = false;
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.error = null;
				state.items = state.items.filter((el) => el.id !== action.payload.id);
				state.isLoading = false;
			})
			.addCase(editContact.fulfilled, (state, action) => {
				const contactToEdit = state.items.findIndex(
					(el) => el.id === action.payload.id
				);
				state.items[contactToEdit] = action.payload;
				state.isLoading = false;
			})
			.addMatcher(isAnyOf(...allPending),
				(state) => { state.isLoading = true }
			)
			.addMatcher(isAnyOf(...allRejected), (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
  }
});

export const selectContactToEdit = state => state.contacts.contactToEdit;
export const selectAllContacts = (state) => state.contacts.items;

export const selectFilteredContacts = createSelector(
	[selectAllContacts, selectFilterValue],
	(contacts, filter) => contacts.filter((el) =>
		el.name.toLowerCase().includes(filter.toLowerCase())
	)
);

export const { passEditId } = contactsSlice.actions;

export default contactsSlice.reducer;