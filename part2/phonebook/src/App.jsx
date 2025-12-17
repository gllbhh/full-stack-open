import { useState, useEffect } from "react";
import axios from "axios";
import ContactList from "./ContactList";
import Filter from "./Filter";
import AddContact from "./AddContact";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	// fetch data from localhost server using useEffect
	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/persons").then((response) => {
			console.log("promise fulfilled");
			setPersons(response.data);
		});
	}, []);

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
			<h1>Phonebook</h1>
			<Filter handleInputFilter={handleInputFilter} />
			<AddContact
				name={newName}
				number={newNumber}
				handleInputName={handleInputName}
				handleInputNumber={handleInputNumber}
				submitFunction={updatePhonebook}
			/>
			<ContactList contacts={persons} filter={filter} />
		</div>
	);
};

export default App;
