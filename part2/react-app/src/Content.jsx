import React from "react";
import Part from "./Part";

export default function Content({ props }) {
	console.log(props);
	const output = props.parts.map((p, i) => <Part key={i} part={p.name} exerc={p.exercises} />);
	return <>{output}</>;
}
