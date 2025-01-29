import "./App.scss";
import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "./redux/auth/operations.js";
import { selectIsLoggedIn } from "./redux/auth/selectors.js";

const ContactsPage = lazy(() =>
	import("./pages/ContactsPage/ContactsPage.jsx"));
const LoginPage = lazy(() =>
	import("./pages/LoginPage/LoginPage.jsx"));
const RegisterPage = lazy(() =>
	import("./pages/RegisterPage/RegisterPage.jsx"));

function App() {
	const isLoggedIn = useSelector(selectIsLoggedIn);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, [dispatch]);

	return (
		<>
			<Routes>
				<Route path="/" element={<SharedLayout />}>
					<Route index element={<div>This is Home page</div>} />
					<Route
						path="/contacts"
						element={isLoggedIn ? <ContactsPage /> : <Navigate to="/login" />}
					/>
					<Route
						path="/login"
						element={isLoggedIn ? <Navigate to="/contacts" /> : <LoginPage />}
					/>
					<Route path="/register" element={<RegisterPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
