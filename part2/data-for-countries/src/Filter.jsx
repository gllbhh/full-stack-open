import React from "react";

const Filter = ({ handleInputFilter }) => {
	return (
		<div>
			Filter countries: <input onChange={handleInputFilter} />
		</div>
	);
};

export default Filter;
