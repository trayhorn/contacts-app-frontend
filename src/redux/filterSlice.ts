import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type FilterState = {
	name: string;
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: {name: ''} as FilterState,
  reducers: {
    changeFilter: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    }
  }
})

export const selectFilterValue = (state: RootState) => state.filter.name;

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;