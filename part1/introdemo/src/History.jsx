import React, { useState } from "react";

export const History = ({ props }) => {
	if (props.allClicks.length === 0) {
		return <div>The app is used by pressing the buttons</div>;
	}
	return (
		<>
			<p>Button press History:</p>
			<p>{props.allClicks.join(" ")}</p>
		</>
	);
};
