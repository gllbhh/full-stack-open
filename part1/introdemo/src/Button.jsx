import React from "react";

const Button = ({ props }) => {
	let { onClick, text, fieldName } = props;
	return (
		<button type="button" class="btn btn-primary" style={{ margin: "5px" }} onClick={() => onClick(fieldName)}>
			{text}
		</button>
	);
};

export default Button;
