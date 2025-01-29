import { Link } from "react-router-dom";

export default function AuthNav() {
  return (
		<nav>
			<Link to="/login">
				<button className="link">Log in</button>
			</Link>
			<Link to="/register">
				<button className="link">Sign in</button>
			</Link>
		</nav>
	);
}