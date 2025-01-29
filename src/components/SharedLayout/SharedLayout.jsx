import { Outlet } from "react-router-dom";
import './SharedLayout.scss';
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import AppBar from "../AppBar";
import { Suspense } from "react";
import { selectAuth } from "../../redux/auth/selectors";

export default function SharedLayout() {
	const { isRefreshing, loading } = useSelector(selectAuth);

  return (
		<>
			{isRefreshing ? (
				<div className="loaderOverlay">
					<ThreeDots
						visible={true}
						height="80"
						width="80"
						color="#4CAF50"
						ariaLabel="three-dots-loading"
						wrapperClass="loader"
					/>
				</div>
			) : (
				<main>
					<AppBar />
					<Suspense fallback={<div>Loading...</div>}>
						{loading ? (
							<div className="loaderOverlay">
								<ThreeDots
									visible={true}
									height="80"
									width="80"
									color="#4CAF50"
									ariaLabel="three-dots-loading"
									wrapperClass="loader"
								/>
							</div>
						) : (
							<Outlet />
						)}
						{/* <Outlet /> */}
					</Suspense>
				</main>
			)}
		</>
	);
}