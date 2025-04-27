import "./SearchBox.scss";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter, selectFilterValue } from "../../redux/filterSlice";

export default function SearchBox() {
	const filter = useSelector(selectFilterValue);
	const dispatch = useDispatch();
	const inputId = nanoid();

	return (
		<div className="searchBox">
			<label className="label" htmlFor={inputId}>
				Find contacts by name
			</label>
			<input
				className="input"
				type="text"
				value={filter}
				onChange={(e) => dispatch(changeFilter(e.target.value))}
				id={inputId}
			/>
		</div>
	);
}