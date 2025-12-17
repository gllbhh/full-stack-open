import React from "react";

const AddContact = ({ name, number, handleInputName, handleInputNumber, submitFunction }) => {
	return (
		<div>
			<h2>Add new</h2>
			<form onSubmit={submitFunction}>
				<div>
					name: <input value={name} onChange={handleInputName} />
				</div>
				<div>
					number: <input value={number} onChange={handleInputNumber} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</div>
	);
};

export default AddContact;
