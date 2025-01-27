import './App.scss';
import { Routes, Route, Link } from "react-router-dom";
import ContactsPage from './pages/ContactsPage';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';

function App() {

	return (
		<>
			<header>
				<nav>
					<Link className="link" to="/">
						Home
					</Link>
					<Link className="link" to="/contacts">
						Contacts
					</Link>
				</nav>
				<nav>
					<Link to="/login">
						<button className="link">Log in</button>
					</Link>
					<Link to="/register">
						<button className="link">Sign in</button>
					</Link>
				</nav>
			</header>
			<Routes>
				<Route path="/" element={<div>This is Home page</div>} />
				<Route path="/contacts" element={<ContactsPage />} />
				<Route path="/login" element={<LoginForm />} />
				<Route
					path="/register"
					element={<RegisterForm />}
				/>
			</Routes>
		</>
	);
}

export default App;
