import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const handleNewName = (event) => {
		console.log(event.target.value);
		setNewName(event.target.value);
	};

	const updatePhonebook = (event) => {
		// prevent page from reloading
		event.preventDefault();
		const updatedPersons = [...persons, { name: newName }];
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
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={updatePhonebook}>
				<div>
					name: <input value={newName} onChange={handleNewName} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
				<div>debug: {newName} </div>
			</form>
			<h2>Numbers</h2>
			<ol>
				{persons.map((p) => (
					<li key={p.name}>{p.name}</li>
				))}
			</ol>
		</div>
	);
};

export default App;
