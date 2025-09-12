import React from "react";

export default function Header({ props }) {
	const exercises = props.parts.map((e) => e.exercises);
	console.log(exercises);
	const sum = exercises.reduce((s, e) => s + e, 0);
	console.log(sum);
	return (
		<>
			<p>Number of exercises {sum}</p>
		</>
	);
}
