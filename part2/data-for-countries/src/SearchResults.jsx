import React from "react";

const SearchResults = ({ countriesList }) => {
	if (!countriesList) {
		return;
	}
	if (countriesList.length === 0) {
		return <p>No countries matching your search</p>;
	}
	const content =
		countriesList.length < 10 ? (
			<>
				<p>Countries matching your search:</p>
				{countriesList.map((e, i) => (
					<div key={i}>
						{e.name.common}, {e.name.official}
					</div>
				))}
			</>
		) : (
			<p>More than 10 countries found. Pleas be more specific</p>
		);

	return <div>{content}</div>;
};

export default SearchResults;
