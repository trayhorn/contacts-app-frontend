import './App.scss';
import { Routes, Route } from "react-router-dom";
import ContactsPage from './pages/ContactsPage';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import SharedLayout from './components/SharedLayout/SharedLayout';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<SharedLayout />}>
					<Route index element={<div>This is Home page</div>} />
					<Route path="/contacts" element={<ContactsPage />} />
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<RegisterForm />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
