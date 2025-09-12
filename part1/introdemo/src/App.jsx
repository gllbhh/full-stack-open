import { useState } from "react";
import { History } from "./History";
import Button from "./Button";

const App = () => {
	// const [left, setLeft] = useState(0);
	// const [right, setRight] = useState(0);
	const [clicks, setClicks] = useState({
		left: 0,
		right: 0,
	});

	const [allClicks, setAllClicks] = useState([]);

	const [total, setTotal] = useState(0);

	const handClicks = (fieldName) => {
		const newClicks = {
			...clicks,
			[fieldName]: clicks[fieldName] + 1,
		};
		if (fieldName === "left") {
			setAllClicks(allClicks.concat("L"));
		}
		if (fieldName === "right") {
			setAllClicks(allClicks.concat("R"));
		}
		setClicks(newClicks);
		setTotal(newClicks.left + newClicks.right);
	};

	return (
		<div className="d-flex flex-column justify-content-center align-items-center vh-100">
			<div>
				{clicks.left}
				<Button props={{ onClick: handClicks, text: "left", fieldName: "left" }} />
				<Button props={{ onClick: handClicks, text: "right", fieldName: "right" }} />
				{/* <button onClick={() => handClicks("left")}>left</button>
			<button onClick={() => handClicks("right")}>left</button> */}
				{clicks.right}
			</div>
			<div className="d-flex flex-column justify-content-center align-items-center">
				<History props={{ allClicks }} />
				{/* <p>{allClicks.join(" ")}</p> */}
				<p>Total: {total} </p>
			</div>
		</div>
	);
};

export default App;
