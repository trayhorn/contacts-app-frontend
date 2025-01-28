import './App.scss';
import { Routes, Route, Navigate } from "react-router-dom";
import ContactsPage from './pages/ContactsPage';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import SharedLayout from './components/SharedLayout/SharedLayout';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from './redux/authoperations';

function App() {
	const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

	const dispatch = useDispatch();

	useEffect(() => {
			dispatch(fetchCurrentUser());
	}, [dispatch])

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
						element={isLoggedIn ? <Navigate to="/contacts" /> : <LoginForm />}
					/>
					<Route path="/register" element={<RegisterForm />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
