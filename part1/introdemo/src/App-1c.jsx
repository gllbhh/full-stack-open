import { useState } from "react";
import Hello from "./Hello";

const App = () => {
	const [counter, setCounter] = useState(0);

	const handleClick = () => {
		console.log("clicked", { counter });
		setCounter(counter + 1);
	};

	const incrementCounter = () => {
		setCounter(counter + 1);
		console.log(counter);
	};

	const zeroCounter = () => {
		setCounter(0);
		console.log(counter);
	};

	const decrementCounter = () => {
		setCounter(counter - 1);
		console.log(counter);
	};

	// const Display = ({ counter }) => {
	// 	return <h2>{counter}</h2>;
	// };
	const Display = ({ counter }) => (
		<div>
			<h2>{counter}</h2>
		</div>
	);

	const Button = ({ onClick, text }) => (
		<button style={{ width: "20px", height: "20px", backgroundColor: "grey" }} onClick={onClick}>
			{text}
		</button>
	);
	const alison = {
		name: "Alison",
		age: 32,
	};
	const john = {
		name: "John",
		age: 45,
	};
	return (
		<div>
			<Hello props={alison} />
			<Hello props={john} />
			<Display counter={counter} />
			<Button onClick={decrementCounter} text="-" />
			<Button onClick={zeroCounter} text="0" />
			<Button onClick={incrementCounter} text="+" />
		</div>
	);
};

export default App;
