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
		console.log("Loading contacts");
		getContacts();
	}, []);

	// function to get contacts
	// get all returns the response data so we can set persons straight away
	// otherwise use response.data
	const getContacts = () => {
		personService.getAll().then((fetchedPersons) => {
			// sort by name
			fetchedPersons.sort((a, b) => {
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
			console.log("Loaded data: ", fetchedPersons);
			setPersons(fetchedPersons);
		});
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

	// function to handle adding/updating person
	const updatePhonebook = (event) => {
		// prevent page from reloading
		event.preventDefault();

		// prevent empty fields
		if (newName === "" || newNumber === "") {
			alert("Failed to add a name: One or more of the fields is empty");
			console.log("Failed to add: empty fields");
			return;
		}

		// if the name is already on the list suggest to update person's number
		if (persons.some((person) => person.name === newName)) {
			const p = persons.find((person) => person.name === newName);
			console.log(`Updating user ${p.name} at index ${persons.indexOf(p)}`);
			const alertMessage = `${newName} is already in your contactas.\nUpdate ${newName}'s number?`;

			if (confirm(alertMessage)) {
				console.log(`Updating ${newName}'s number`);
				personService
					// update method takes id and a new object
					.update(p.id, { ...p, number: newNumber })
					.then((response) => {
						console.log(response);
						const newPersons = [...persons];
						newPersons[persons.indexOf(p)] = response;
						setPersons(newPersons);
						setNewName("");
						setNewNumber("");
						console.log(`Successfully updated ${p.name}`);
					})
					.catch((error) => {
						console.log(`failed to update ${p.name}`);
					});
				return;
			} else {
				console.log("update canceled by user");
				return;
			}
		}

		// create a new person
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
