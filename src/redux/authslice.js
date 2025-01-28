import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser, fetchCurrentUser } from "./authoperations";

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
		error: null
	},
  extraReducers: builder => {
    builder
			.addCase(registerUser.fulfilled, (state, action) => {
				console.log(action.payload);
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isLoggedIn = true;
			})
			.addCase(loginUser.rejected, (_, action) => {
				console.log(action.payload);
			})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
				state.isLoggedIn = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
				state.user = { name: null, email: null };
				state.token = null;
				state.isLoggedIn = false;
			})
			.addCase(fetchCurrentUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isLoggedIn = true;
			})
  }
});

export default authSlice.reducer;