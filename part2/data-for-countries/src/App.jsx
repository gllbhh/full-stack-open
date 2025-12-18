import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import SearchResults from "./SearchResults";
import CountryInformation from "./CountryInformation";

function App() {
	const [filter, setFilter] = useState(null);
	const [countries, setCountries] = useState(null);
	const [countryToShow, setCountryToShow] = useState(null);

	// fetch countries list on filter update
	useEffect(() => {
		console.log("current filter: ", filter);
		if (!filter) {
			setCountries(null);
		}
		if (filter) {
			console.log("fetching countries...");
			// fetch list of countries from api using axios
			axios
				.get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
				.then((response) => {
					// filter fetched data
					const fetchedCountries = response.data.filter(
						(e) =>
							e.name.common.toLowerCase().includes(filter.toLowerCase()) ||
							e.name.official.toLowerCase().includes(filter.toLowerCase())
					);
					console.log("countires found: ", fetchedCountries.length);
					// if there is only 1 country found, set state variable, else null
					const soleCountry = fetchedCountries.length === 1 ? fetchedCountries[0] : null;
					console.log(soleCountry);
					setCountryToShow(soleCountry);
					setCountries(fetchedCountries);
				})
				.catch((error) => {
					console.log("failed to fetch countries");
				});
		}
	}, [filter]);

	const handleInputFilter = (event) => {
		console.log("filter: ", event.target.value);
		if (event.target.value === "") {
			setFilter(null);
		} else {
			setFilter(event.target.value);
		}
	};

	const handleShowButton = (country) => {
		setCountryToShow(country);
	};
	// render country information if only one country is found or search results if more
	const content = countryToShow ? (
		<CountryInformation country={countryToShow} />
	) : (
		<SearchResults countriesList={countries} buttonF={handleShowButton} />
	);

	return (
		<>
			<h1>Data for Countries</h1>
			<Filter handleInputFilter={handleInputFilter} />
			{content}
		</>
	);
}

export default App;
