import { NavLink } from "react-router-dom";

export default function AuthNav() {
  return (
		<nav className="auth-nav">
			<NavLink className="auth-link" to="/login">
				<button className="auth-button">Log in</button>
			</NavLink>
			<NavLink className="auth-link" to="/register">
				<button className="auth-button">Sign in</button>
			</NavLink>
		</nav>
	);
}