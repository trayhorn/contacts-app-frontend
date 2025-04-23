import UserMenu from "./UserMenu/UserMenu";
import AuthNav from "./AuthNav/AuthNav";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/selectors";

export default function AppBar() {
	const { isLoggedIn } = useSelector(selectAuth);
	return (
		<header>
			{isLoggedIn ? <UserMenu /> : <AuthNav />}
		</header>
	);
}
