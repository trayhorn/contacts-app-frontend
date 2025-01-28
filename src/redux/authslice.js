import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./authoperations";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: {
			name: null,
			email: null,
		},
		token: null,
		isLoggedIn: false,
		isRefreshing: false,
	},
  extraReducers: builder => {
    builder
			.addCase(registerUser.fulfilled, (state, action) => {
				console.log(action.payload);
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isLoggedIn = true;
			})
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.user;
        state.token = action.payload.token;
				state.isLoggedIn = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
				state.user = { name: null, email: null };
				state.token = null;
				state.isLoggedIn = false;
      })
  }
});

export default authSlice.reducer;