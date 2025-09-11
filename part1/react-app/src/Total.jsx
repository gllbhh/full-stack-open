import React from "react";

export default function Header({ props }) {
	return (
		<>
			<p>Number of exercises {props.exerc[0] + props.exerc[1] + props.exerc[2]}</p>
		</>
	);
}
