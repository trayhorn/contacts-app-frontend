import "./error.scss";
import { RxCrossCircled } from "react-icons/rx";

export default function ErrorMessage() {
  return (
		<div className="error">
			<div className="image-container">
				<RxCrossCircled className="error_image" size={200} color="red" />
			</div>
			<p className="text">Error</p>
		</div>
	);
}