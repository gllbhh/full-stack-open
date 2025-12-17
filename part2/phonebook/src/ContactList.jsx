import React from "react";
import ContactItem from "./ContactItem";

const ContactList = ({ contacts, filter, removeContact }) => {
	return (
		<div>
			<h2>Contacts:</h2>
			<ol>
				{contacts
					.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
					.map((contact) => (
						<ContactItem person={contact} removeContact={removeContact} key={contact.id} />
					))}
			</ol>
		</div>
	);
};

export default ContactList;
