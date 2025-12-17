import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import personService from "./services/persons";
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
		getContacts();
	}, []);

	const getContacts = () => {
		personService.getAll().then((persons) => setPersons(persons));
	};

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
		const newPerson = { name: newName, number: newNumber };
		personService
			.create(newPerson)
			.then((returnedPerson) => {
				//const updatedPersons = [...persons, returnedPerson];
				const updatedPersons = persons.concat(returnedPerson);
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
			})
			.catch((error) => {
				console.log("failed to add a person to contacts");
			});
	};

	const removeContact = (id) => {
		console.log(`deleting user ${persons.filter((person) => person.id === id)[0].name} started`);
		if (confirm(`Are you sure that you want to delete ${persons.filter((person) => person.id === id)[0].name}?`)) {
			personService
				.deleteById(id)
				.then((response) => {
					console.log(response);
					const updatedPersons = persons.filter((person) => person.id !== id);
					setPersons(updatedPersons);
				})
				.catch((error) => {
					console.log("deletion failed");
				});
		} else {
			console.log("deletion canceled by user");
		}
		return;
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
			<ContactList contacts={persons} removeContact={removeContact} filter={filter} />
		</div>
	);
};

export default App;
