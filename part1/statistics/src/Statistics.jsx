import React from "react";
import StatisticsLine from "./StatisticsLine";

const Statistics = ({ props }) => {
	const { good, neutral, bad } = props;
	const all = good + neutral + bad;
	const avg = all === 0 ? 0 : (good - bad) / all;
	const pos = all === 0 ? 0 : (good / all) * 100;
	let output;
	if (all === 0) {
		output = <div>No Feedback Given</div>;
	} else {
		output = (
			<div style={{ textAlign: "left" }}>
				{/* <p>Good: {good}</p>
				<p>Neutral: {neutral}</p>
				<p>Bad: {bad}</p>
				<p>All: {all}</p>
				<p>Average: {avg.toFixed(2)}</p>
				<p>Positive: {pos.toFixed(2)}%</p> */}
				<table className="table">
					<tbody>
						<StatisticsLine props={{ text: "Good: ", value: good, text1: "" }} />
						<StatisticsLine props={{ text: "Neutral: ", value: neutral, text1: "" }} />
						<StatisticsLine props={{ text: "Bad: ", value: bad, text1: "" }} />
						<StatisticsLine props={{ text: "All: ", value: all, text1: "" }} />
						<StatisticsLine props={{ text: "Average: ", value: avg.toFixed(2), text1: "" }} />
						<StatisticsLine props={{ text: "Positive: ", value: pos.toFixed(2), text1: "%" }} />
					</tbody>
				</table>
			</div>
		);
	}
	return (
		<div>
			<h1>Statistics</h1>
			{output}
		</div>
	);
};

export default Statistics;
