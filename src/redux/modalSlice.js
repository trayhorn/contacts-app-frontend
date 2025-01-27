import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
	name: "modal",
	initialState: {
		isOpen: false
	},
	reducers: {
		toggleModal: (state, action) => {
			state.isOpen = action.payload;
		}
	},
});

export const selectIsModalOpen = state => state.modal.isOpen;

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;