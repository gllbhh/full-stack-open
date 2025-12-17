import React from "react";

const ContactItem = ({ person }) => {
	return (
		<li>
			{person.name} {person.number}{" "}
		</li>
	);
};

export default ContactItem;
