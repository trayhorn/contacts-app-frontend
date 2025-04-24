import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchAllContacts, addContact, deleteContact, editContact } from "./operations";
import { selectFilterValue } from "./filterSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type Contact = {
	_id: string;
	name: string;
	number: string;
	owner?: string;
	createdAt?: string;
	updatedAt?: string;
}

type contactsState = {
	items: Contact[];
	isLoading: boolean;
	error: unknown;
	contactToEdit: Contact | {};
};

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
		contactToEdit: {},
	} as contactsState,
	reducers: {
		passEditId: (state, action) => {
			state.contactToEdit = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
				state.error = null;
				state.items = action.payload;
				state.isLoading = false;
			})
			.addCase(addContact.fulfilled, (state, action: PayloadAction<Contact>) => {
				state.error = null;
				state.items.push(action.payload);
				state.isLoading = false;
			})
			.addCase(deleteContact.fulfilled, (state, action: PayloadAction<Contact>) => {
				state.error = null;
				state.items = state.items.filter((el) => el._id !== action.payload._id);
				state.isLoading = false;
			})
			.addCase(editContact.fulfilled, (state, action: PayloadAction<Contact>) => {
				const contactToEdit = state.items.findIndex(
					(el) => el._id === action.payload._id
				);
				state.items[contactToEdit] = action.payload;
				state.isLoading = false;
			})
			.addMatcher(isAnyOf(...allPending), (state) => {
				state.isLoading = true;
			})
			.addMatcher(isAnyOf(...allRejected), (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const selectContactToEdit = (state: RootState) => state.contacts.contactToEdit;
export const selectAllContacts = (state: RootState) => state.contacts.items;

export const selectFilteredContacts = createSelector(
	[selectAllContacts, selectFilterValue],
	(contacts, filter) => contacts.filter((el: Contact) =>
		el.name.toLowerCase().includes(filter.toLowerCase())
	)
);

export const { passEditId } = contactsSlice.actions;

export default contactsSlice.reducer;