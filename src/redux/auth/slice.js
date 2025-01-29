import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
	registerUser,
	loginUser,
	logoutUser,
	fetchCurrentUser,
} from "./operations";

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
		error: null,
		loading: false,
	},
	extraReducers: (builder) => {
		builder
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = { name: null, email: null };
				state.token = null;
				state.isLoggedIn = false;
				state.loading = false;
			})
			.addCase(fetchCurrentUser.pending, (state) => {
				state.isLoggedIn = false;
				state.isRefreshing = true;
			})
			.addCase(fetchCurrentUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isLoggedIn = true;
				state.isRefreshing = false;
			})
			.addCase(fetchCurrentUser.rejected, (state, action) => {
				state.isRefreshing = false;
				state.error = action.payload;
			})
			.addMatcher(
				isAnyOf(registerUser.fulfilled, loginUser.fulfilled),
				(state, action) => {
					state.user = action.payload.user;
					state.token = action.payload.token;
					state.isLoggedIn = true;
					state.loading = false;
				}
			)
			.addMatcher(
				isAnyOf(registerUser.pending, loginUser.pending, logoutUser.pending),
				(state) => {
					state.loading = true;
				}
			)
			.addMatcher(
				isAnyOf(registerUser.rejected, loginUser.rejected, logoutUser.rejected),
				(state, action) => {
					state.loading = false;
					state.error = action.payload;
				}
			);
	},
});

export default authSlice.reducer;
