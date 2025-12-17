import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas", phone: "040-1234567" }]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const handleInputName = (event) => {
		console.log("name: ", event.target.value);
		setNewName(event.target.value);
	};

	const handleInputNumber = (event) => {
		console.log("number: ", event.target.value);
		setNewNumber(event.target.value);
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
		const updatedPersons = [...persons, { name: newName, phone: newNumber }];
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
				<div>debug: {newName} </div>
			</form>
			<h2>Numbers</h2>
			<ol>
				{persons.map((p) => (
					<li key={p.name}>
						{p.name} {p.phone}
					</li>
				))}
			</ol>
		</div>
	);
};

export default App;
