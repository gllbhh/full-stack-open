import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};
	console.log("1.5 Course object");
	return (
		<div>
			<Header props={{ course: course.name }} />
			<Content props={{ parts: course.parts }} />
			<Total props={{ parts: course.parts }} />
		</div>
	);
};
export default App;
