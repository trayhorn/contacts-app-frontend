import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import "./UserMenu.scss";
import { selectUser } from "../../redux/auth/selectors";
import { AppDispatch } from "../../redux/store";

export default function UserMenu() {
	const { name } = useSelector(selectUser);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<nav className="userMenuNav">
			<p>Welcome, {name}</p>
			<button className="auth-button" onClick={() => dispatch(logoutUser())}>
				Log out
			</button>
		</nav>
	);
}
