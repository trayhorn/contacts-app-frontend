import { RootState } from "../store";

const selectAuth = (state: RootState) => state.auth;
const selectUser = (state: RootState) => state.auth.user;
const selectToken = (state: RootState) => state.auth.token;
const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
const selectError = (state: RootState) => state.auth.error;

export { selectAuth, selectUser, selectToken, selectIsLoggedIn, selectError };