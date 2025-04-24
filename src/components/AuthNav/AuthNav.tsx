import { Link } from "react-router-dom";

export default function AuthNav() {
  return (
		<nav className="auth-nav">
			<Link className="auth-link" to="/login">
				<button className="auth-button">Log in</button>
			</Link>
			<Link className="auth-link" to="/register">
				<button className="auth-button">Sign in</button>
			</Link>
		</nav>
	);
}