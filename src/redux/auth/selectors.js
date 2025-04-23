const selectAuth = state => state.auth;
const selectUser = state => state.auth.user;
const selectToken = state => state.auth.token;
const selectIsLoggedIn = state => state.auth.isLoggedIn;
const selectError = state => state.auth.error;

export { selectAuth, selectUser, selectToken, selectIsLoggedIn, selectError };