import React from "react";

const Statistics = ({ props }) => {
	let { onClick, text, fieldName } = props;
	return (
		<div>
			<h1>Statistics</h1>
			<p>Good: {props.good}</p>
			<p>Neutral: {props.neutral}</p>
			<p>Bad: {props.bad}</p>
		</div>
	);
};

export default Statistics;
