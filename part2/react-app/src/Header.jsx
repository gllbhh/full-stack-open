import React from "react";

const Header = ({ header }) => {
	console.log("Header loaded");
	console.log("Course name: ", header);
	return <h1>{header}</h1>;
};

export default Header;
