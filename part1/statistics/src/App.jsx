import { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
	// save clicks of each button to its own state
	// const [good, setGood] = useState(0);
	// const [neutral, setNeutral] = useState(0);
	// const [bad, setBad] = useState(0);
	const [feedback, setFeedback] = useState({
		bad: 0,
		neutral: 0,
		good: 0,
	});

	const handleButtonClick = (fieldName) => {
		const newFeedback = {
			...feedback,
			[fieldName]: feedback[fieldName] + 1,
		};
		setFeedback(newFeedback);
		console.log(newFeedback);
	};

	return (
		<div className="d-flex flex-column justify-content-center align-items-center vh-100">
			<h1>Give Feedback</h1>
			<div>
				<Button props={{ onClick: handleButtonClick, text: "good", fieldName: "good" }} />
				<Button props={{ onClick: handleButtonClick, text: "neutral", fieldName: "neutral" }} />
				<Button props={{ onClick: handleButtonClick, text: "bad", fieldName: "bad" }} />
			</div>
			<Statistics props={feedback} />
		</div>
	);
};

export default App;
