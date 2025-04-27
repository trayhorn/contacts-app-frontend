import { Outlet } from "react-router-dom";
import './SharedLayout.scss';
import { useSelector } from "react-redux";
import Loader from "../Loader";
import AppBar from "../AppBar";
import { Suspense } from "react";
import { selectAuth } from "../../redux/auth/selectors";
import { ToastContainer } from "react-toastify";

export default function SharedLayout() {
	const { isRefreshing, loading } = useSelector(selectAuth);

  return (
		<>
			{isRefreshing ? (
				<div className="loaderOverlay">
					<Loader />
				</div>
			) : (
				<main>
					<AppBar />
					<Suspense
						fallback={
							<div className="loaderOverlay">
								<Loader />
							</div>
						}
					>
						{loading ? (
							<div className="loaderOverlay">
								<Loader />
							</div>
						) : (
							<Outlet />
						)}
						</Suspense>
						<ToastContainer />
				</main>
			)}
		</>
	);
}