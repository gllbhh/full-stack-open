import React from "react";

export default function Header({ props }) {
	return (
		<div>
			<p>
				{props.parts[0].part} {props.parts[0].exerc}
			</p>
			<p>
				{props.parts[1].part} {props.parts[1].exerc}
			</p>
			<p>
				{props.parts[2].part} {props.parts[2].exerc}
			</p>
		</div>
	);
}
