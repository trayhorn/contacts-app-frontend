import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import "./UserMenu.scss";
import { selectUser } from "../../redux/auth/selectors";

export default function UserMenu() {
	const {name: username} = useSelector(selectUser);
	const dispatch = useDispatch();

	return (
		<nav className="userMenuNav">
			<p>Welcome, {username}</p>
			<button onClick={() => dispatch(logoutUser())}>Log out</button>
		</nav>
	);
}
