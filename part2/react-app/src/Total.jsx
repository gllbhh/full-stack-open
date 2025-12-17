import React from "react";

export default function Header({ props }) {
	const exercises = props.parts.map((e) => e.exercises);
	console.log(exercises);
	// use array.reduce() method with an arrow function to calculate sum
	const sum = exercises.reduce((s, e) => {
		console.log("accumulator: ", s, "| current value: ", e);
		return s + e;
	}, 0); // ,0 sets initail value to 0
	console.log("total: ", sum);
	return (
		<p>
			<b>Total of {sum} exercises</b>
		</p>
	);
}
