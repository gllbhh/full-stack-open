import React from "react";

const ContactItem = ({ person, removeContact }) => {
	return (
		<li>
			{person.name} {person.number}{" "}
			<button className="delete-contact-btn" onClick={() => removeContact(person.id)}>
				x
			</button>
		</li>
	);
};

export default ContactItem;
