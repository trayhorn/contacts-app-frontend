import "./App.scss";
import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "./redux/auth/operations";
import { selectIsLoggedIn } from "./redux/auth/selectors";
import { AppDispatch } from "./redux/store";

const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

function App() {
	const isLoggedIn = useSelector(selectIsLoggedIn);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, [dispatch]);

	return (
		<>
			<Routes>
				<Route path="/" element={<SharedLayout />}>
					<Route index element={<Navigate to="/login" />} />
					<Route
						path="contacts"
						element={isLoggedIn ? <ContactsPage /> : <Navigate to="/login" />}
					/>
					<Route
						path="login"
						element={isLoggedIn ? <Navigate to="/contacts" /> : <LoginPage />}
					/>
					<Route
						path="register"
						element={
							isLoggedIn ? <Navigate to="/contacts" /> : <RegisterPage />
						}
					/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
