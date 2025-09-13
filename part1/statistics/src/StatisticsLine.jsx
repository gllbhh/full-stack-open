import React from "react";

const StatisticsLine = ({ props }) => {
	let { text, value, text1 } = props;
	return (
		<tr>
			<td>{text}</td>
			<td>
				{value}
				{text1}
			</td>
		</tr>
	);
};

export default StatisticsLine;
