import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const App = () => {
	const course = "Half Stack application development";
	const part1 = "Fundamentals of React";
	const exercises1 = 10;
	const part2 = "Using props to pass data";
	const exercises2 = 7;
	const part3 = "State of a component";
	const exercises3 = 14;

	return (
		<div>
			<Header course={course} />
			<Content
				props={{
					parts: [
						{ part: part1, exerc: exercises1 },
						{ part: part2, exerc: exercises2 },
						{ part: part3, exerc: exercises3 },
					],
				}}
			/>
			<Total props={{ exerc: [exercises1, exercises2, exercises3] }} />
		</div>
	);
};

export default App;
