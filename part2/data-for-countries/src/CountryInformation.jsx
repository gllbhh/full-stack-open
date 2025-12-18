import React from "react";
import Weather from "./Weather";

const CountryInformation = ({ country }) => {
	const languages = Object.values(country.languages);
	console.log(languages);
	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>
				Capital: {country.capital} <br />
				Population: {country.population} <br />
				Area: {country.area} km<sup>2</sup>
			</p>
			<div>
				<h3>Languages</h3>
				<ul>
					{languages.map((l, i) => (
						<li key={i}>{l}</li>
					))}
				</ul>
			</div>
			<img src={country.flags.png} style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)" }} />
			<Weather city={country.capital} />
		</div>
	);
};

export default CountryInformation;
