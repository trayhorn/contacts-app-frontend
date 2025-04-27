import { RootState } from "../store";

const selectAuth = (state: RootState) => state.auth;
const selectToken = (state: RootState) => state.auth.token;
const selectUser = (state: RootState) => state.auth.user;
const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
const selectContacts = (state: RootState) => state.contacts;
const selectError = (state: RootState) => state.auth.error;

export {
	selectAuth,
	selectUser,
	selectToken,
	selectIsLoggedIn,
	selectError,
	selectContacts,
};