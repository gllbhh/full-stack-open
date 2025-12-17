import React from "react";

const Filter = ({ handleInputFilter }) => {
	return (
		<div>
			Filter contacts: <input onChange={handleInputFilter} />
		</div>
	);
};

export default Filter;
