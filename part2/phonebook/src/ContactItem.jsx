import React from "react";

const ContactItem = ({ person, removeContact }) => {
	return (
		<li>
			{person.name} {person.number} <button onClick={() => removeContact(person.id)}>x</button>
		</li>
	);
};

export default ContactItem;
