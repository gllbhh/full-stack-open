import React from "react";

const Header = ({ header }) => {
	console.log("Header loaded");
	console.log("Course name: ", header);
	return <h2>{header}</h2>;
};

export default Header;
