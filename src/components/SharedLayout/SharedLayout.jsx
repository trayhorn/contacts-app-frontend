import { Link, Outlet } from "react-router-dom";
import './SharedLayout.scss';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authoperations";

export default function SharedLayout() {
  const { isLoggedIn } = useSelector(state => state.auth);
  console.log(isLoggedIn);
  const dispatch = useDispatch();

  return (
		<main>
			<header>
				<nav>
					<Link className="link" to="/">
						Home
					</Link>
					<Link className="link" to="/contacts">
						Contacts
					</Link>
				</nav>
				{isLoggedIn ? (
					<nav>
						<button onClick={() => dispatch(logoutUser())}>Log out</button>
					</nav>
				) : (
					<nav>
						<Link to="/login">
							<button className="link">Log in</button>
						</Link>
						<Link to="/register">
							<button className="link">Sign in</button>
						</Link>
					</nav>
				)}
			</header>
			<Outlet />
		</main>
	);
}