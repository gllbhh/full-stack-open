const express = require("express");
const morgan = require("morgan");
const app = express();

// import the persons data from phonebook.js
var persons = require("./phonebook");

// middleware to parse JSON bodies
app.use(express.json());

// middleware to log requests
const requestLogger = (request, response, next) => {
	console.log("Date:", new Date());
	console.log("Method:", request.method);
	console.log("Path: ", request.path);
	console.log("Body: ", request.body);
	console.log("---");
	next();
};

// use the request logger middleware
// placement of the middleware is important, it should be before the routes
//app.use(requestLogger);

/*
Morgan logging quick reference

Built-in formats:
- tiny
- dev
- short
- common
- combined

Useful tokens you can use in a custom format string:
:method
:url
:status
:response-time
:total-time
:res[content-length]
:date[clf]
:date[iso]
:http-version
:remote-addr
:remote-user
:referrer
:user-agent
:req[header-name]
:res[header-name]

Example custom format:
:method :url :status :res[content-length] - :response-time ms
*/

// Log method, URL, status, timing, and body
// app.use(morgan("tiny"));

// Optional custom token to log request body
morgan.token("body", (req) => JSON.stringify(req.body));
// custom format including body
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

let notes = [
	{
		id: "1",
		content: "HTML is easy",
		important: true,
	},
	{
		id: "2",
		content: "Browser can execute only JavaScript",
		important: false,
	},
	{
		id: "3",
		content: "GET and POST are the most important methods of HTTP protocol",
		important: true,
	},
	{
		id: "4",
		content: "Coding is fun",
		important: false,
	},
];

// generate a new id for a note function
const generateId = () => {
	const maxId = notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
	return String(maxId + 1);
};

// generate a new id for a person function
const generateIdPersons = () => {
	const maxId = persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0;
	return String(maxId + 1);
};

// get root route
app.get("/", (request, response) => {
	response.send(
		"<img src='https://i1.sndcdn.com/artworks-x8zI2HVC2pnkK7F5-4xKLyA-t500x500.jpg' alt='Never Gonna Give You Up!' />",
	);
});

// get all notes
app.get("/api/notes", (request, response) => {
	response.json(notes);
});

// get a note by id
app.get("/api/notes/:id", (request, response) => {
	const id = request.params.id;
	const note = notes.find((note) => note.id === id);
	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}
});

// delete a note
app.delete("/api/notes/:id", (request, response) => {
	const id = request.params.id;
	notes = notes.filter((note) => note.id !== id);

	response.status(204).end();
});

// add a note
app.post("/api/notes", (request, response) => {
	const body = request.body;

	if (!body.content) {
		return response.status(400).json({
			error: "content missing",
		});
	}

	const note = {
		content: body.content,
		important: body.important || false,
		id: generateId(),
	};

	notes = notes.concat(note);

	response.json(note);
});
// add a note
app.post("/api/notes", (request, response) => {
	const body = request.body;

	if (!body.content) {
		return response.status(400).json({
			error: "content missing",
		});
	}

	const note = {
		content: body.content,
		important: body.important || false,
		id: generateId(),
	};

	notes = notes.concat(note);

	response.json(note);
});

// get all persons
app.get("/api/persons", (request, response) => {
	response.json(persons);
});

// get a single person by id
app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const person = persons.find((person) => person.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

// delete a person by id
app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const person = persons.find((person) => person.id === id);

	if (!person) {
		return response.status(404).json({ error: "person not found" });
	}

	persons = persons.filter((person) => person.id !== id);
	response.status(204).end();
});

// add a person to the phonebook
app.post("/api/persons", (request, response) => {
	const body = request.body;

	// check if the name is present
	if (!body.name) {
		return response.status(400).json({
			error: "name missing",
		});
	}

	// check if the number is present
	if (!body.number) {
		return response.status(400).json({
			error: "number missing",
		});
	}

	// check if the name already exists in the phonebook
	if (persons.find((person) => person.name === body.name)) {
		return response.status(400).json({
			error: "name is already in the phonebook",
		});
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateIdPersons(),
	};

	persons = persons.concat(person);

	response.json(person);
});

// get info about the phonebook
app.get("/info", (request, response) => {
	// console.log(persons.length);
	response.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}</p>`);
});

// middleware to handle unknown endpoints
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
