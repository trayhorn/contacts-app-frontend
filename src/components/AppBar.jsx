import UserMenu from "./UserMenu/UserMenu";
import AuthNav from "./AuthNav/AuthNav";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAuth } from "../redux/auth/selectors";

export default function AppBar() {
	const { isLoggedIn } = useSelector(selectAuth);
	return (
		<header>
			<nav>
				<Link className="link" to="/">
					Home
				</Link>
				{isLoggedIn && (
					<Link className="link" to="/contacts">
						Contacts
					</Link>
				)}
			</nav>
			{isLoggedIn ? <UserMenu /> : <AuthNav />}
		</header>
	);
}
