import Note from "./components/Note";

// const Note = ({ note }) => {
// 	return <li>{note.content}</li>;
// };

const App = (props) => {
	const { notes } = props;
	console.log("notes", notes);
	console.log(
		"note ids: ",
		notes.map((note) => ({
			id: note.id,
			important: note.important,
		}))
	);

	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{/* <li>{notes[0].content}</li>
				<li>{notes[1].content}</li>
				<li>{notes[2].content}</li> */}
				{/* {notes.map((note) => (note.important === true ? <li key={note.id}>{note.content}</li> : ""))} */}
				{notes.map((note) => (
					<Note key={note.id} note={note} />
				))}
			</ul>
		</div>
	);
};

export default App;
