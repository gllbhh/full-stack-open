import React from "react";
import { useState } from "react";

const Phonebook = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	// handle name input
	const handleInputName = (event) => {
		console.log("name: ", event.target.value);
		setNewName(event.target.value);
	};

	// handle number input
	const handleInputNumber = (event) => {
		console.log("number: ", event.target.value);
		setNewNumber(event.target.value);
	};

	// handle filter input
	const handleInputFilter = (event) => {
		console.log("filter: ", event.target.value);
		setFilter(event.target.value);
	};

	const updatePhonebook = (event) => {
		// prevent page from reloading
		event.preventDefault();
		// prevent empty fields
		if (newName === "" || newNumber === "") {
			alert("Failed to add a name: One or more of the fields is empty");
			console.log("Failed to add: empty fields");

			return;
		}

		// prevent adding an existing name
		if (persons.some((person) => person.name === newName)) {
			const alertMessage = `Failed to add ${newName} to the phonebook. \n${newName} alredy exists in your phonebook`;
			alert(alertMessage);
			console.log(alertMessage);

			return;
		}
		// get max id from persons and add 1
		const nextId = persons.reduce((max, person) => Math.max(max, person.id), 0) + 1;

		// use spread operator to update persons
		const updatedPersons = [...persons, { name: newName, number: newNumber, id: nextId }];

		// sort new persons by name
		updatedPersons.sort((a, b) => {
			const nameA = a.name.toUpperCase();
			const nameB = b.name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			// if names are equal
			return 0;
		});
		console.log(updatedPersons);
		// sent persons
		setPersons(updatedPersons);
		// clear the input field
		setNewName("");
		setNewNumber("");
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				Filter contacts: <input onChange={handleInputFilter} />
			</div>
			<h2>Add new</h2>
			<form onSubmit={updatePhonebook}>
				<div>
					name: <input value={newName} onChange={handleInputName} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleInputNumber} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ol>
				{persons
					.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
					.map((p) => (
						<li key={p.id}>
							{p.name} {p.number}
						</li>
					))}
			</ol>
		</div>
	);
};

export default Phonebook;
