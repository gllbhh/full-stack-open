import React from "react";
import Part from "./Part";

export default function Header({ props }) {
	return (
		<div>
			<Part part={props.parts[0].part} exerc={props.parts[0].exerc} />
			<Part part={props.parts[1].part} exerc={props.parts[1].exerc} />
			<Part part={props.parts[2].part} exerc={props.parts[2].exerc} />
		</div>
	);
}
