import React from "react";

const Statistics = ({ props }) => {
	const { good, neutral, bad } = props;
	const all = good + neutral + bad;
	const avg = all === 0 ? 0 : (good - bad) / all;
	const pos = all === 0 ? 0 : (good / all) * 100;
	return (
		<div>
			<h1>Statistics</h1>
			<p>Good: {good}</p>
			<p>Neutral: {neutral}</p>
			<p>Bad: {bad}</p>
			<p>All: {all}</p>
			<p>Average: {avg.toFixed(2)}</p>
			<p>Positive: {pos.toFixed(2)}%</p>
		</div>
	);
};

export default Statistics;
