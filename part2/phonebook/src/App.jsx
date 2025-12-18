import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import personService from "./services/persons";
import Filter from "./Filter";
import AddContact from "./AddContact";
import Notification from "./Notification";
import "./index.css";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [notificationMessage, setNotificationMessage] = useState(null);
	const [notificationClass, setNotificationClass] = useState("");

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
						const message = `Successfully updated contact ${p.name}`;
						console.log(message);
						notificationWithTimout(message, "notification-success", 3000);
					})
					.catch((error) => {
						const message = `Failed to update contact ${p.name}`;
						console.log(message);
						notificationWithTimout(message, "notification-error", 3000);
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
				const message = `Successfully cpreated contact ${newPerson.name}`;
				console.log(message);
				notificationWithTimout(message, "notification-success", 3000);
			})
			.catch((error) => {
				const message = `Failed to add a contact ${newPerson.name}`;
				console.log(message);
				notificationWithTimout(message, "notification-error", 3000);
			});
	};

	const removeContact = (id) => {
		const rName = persons.filter((person) => person.id === id)[0].name;
		console.log(`deleting user ${rName} started`);
		if (confirm(`Are you sure that you want to delete ${persons.filter((person) => person.id === id)[0].name}?`)) {
			personService
				.deleteById(id)
				.then((response) => {
					console.log(response);
					const updatedPersons = persons.filter((person) => person.id !== id);
					setPersons(updatedPersons);
					const message = `Successfully removed contact ${rName}`;
					console.log(message);
					notificationWithTimout(message, "notification-success", 3000);
				})
				.catch((error) => {
					console.log("deletion failed");
					const message = `Failed to remove contact ${rName}`;
					console.log(message);
					notificationWithTimout(message, "notification-error", 3000);
				});
		} else {
			console.log("deletion canceled by user");
		}
		return;
	};

	//display notification for 5 sec
	const notificationWithTimout = (message, cName, timeout) => {
		setNotificationMessage(message);
		setNotificationClass(cName);
		setTimeout(() => {
			setNotificationMessage(null);
		}, timeout);
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message={notificationMessage} nClass={notificationClass} />
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
