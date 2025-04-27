import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
	return (
		<ThreeDots
			visible={true}
			height="80"
			width="80"
			color="#4CAF50"
			ariaLabel="three-dots-loading"
			wrapperClass="loader"
		/>
	);
}
