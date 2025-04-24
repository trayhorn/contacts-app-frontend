import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const modalSlice = createSlice({
	name: "modal",
	initialState: { isOpen: false } as { isOpen: boolean },
	reducers: {
		toggleModal: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
	},
});

export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;