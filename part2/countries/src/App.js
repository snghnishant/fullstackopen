import React from "react";
import getAll from "./Services/countries";
import "./App.css";

const CountryName = ({ name }) => {
	return <p>{name}</p>;
};

const CountryData = ({ name, capital, population, languages, flag }) => {
	return (
		<div>
			<h1>{name}</h1>
			<div>
				<p>Capital: {capital}</p>
				<p>Population: {population}</p>
			</div>
			<h2>Languages</h2>
			<ul>
				{languages.map((lang) => (
					<li>{lang.name}</li>
				))}
			</ul>
			<img style={{ width: 120 }} src={flag} alt={name} />
		</div>
	);
};

const App = () => {
	const [searchStr, setSearchStr] = React.useState("");
	const [countries, setCountries] = React.useState([]);

	const moreFilters = "Too many matches, specify another filter";

	const inputHandler = (event) => {
		setSearchStr(event.target.value);
	};

	// Fetching data
	const fetchData = () => {
		if (searchStr !== "") {
			getAll(searchStr).then((returnedData) => {
				setCountries(returnedData);
			});
		}
	};

	React.useEffect(fetchData, [searchStr]);

	return (
		<div>
			<div>
				Find Countries: <input onChange={inputHandler} />
			</div>
			<div>
				{countries.length === 0 ? null : countries.length === 1 ? (
					<CountryData
						name={countries[0].name}
						capital={countries[0].capital}
						population={countries[0].population}
						languages={countries[0].languages}
						flag={countries[0].flag}
					/>
				) : countries.length <= 10 && countries.length > 0 ? (
					countries.map((country, index) => (
						<CountryName key={index} name={country.name} />
					))
				) : (
					<p>{moreFilters}</p>
				)}
			</div>
		</div>
	);
};

export default App;
