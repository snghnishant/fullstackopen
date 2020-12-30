import React from "react";
import getAll from "./Services/countries";
import "./App.css";

const CountryName = ({ name, showDataHandler }) => {
	return (
		<div>
			<p>{name}</p>
		</div>
	);
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
	const showInit = new Array(10).fill(false);

	const [searchStr, setSearchStr] = React.useState("");
	const [countries, setCountries] = React.useState([]);
	const [showData, setShowData] = React.useState(showInit);

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
					<div>
						{countries.map((country, index) => (
							<div>
								<CountryName name={country.name} />
								<button
									onClick={() => {
										const showArr = [...showData];
										showArr[index] = !showArr[index];
										setShowData(showArr);
									}}
								>
									{showData[index] ? "hide" : "show"}
								</button>
								{showData[index] ? (
									<CountryData
										name={country.name}
										capital={country.capital}
										population={country.population}
										languages={country.languages}
										flag={country.flag}
									/>
								) : null}
							</div>
						))}
					</div>
				) : (
					<p>{moreFilters}</p>
				)}
			</div>
		</div>
	);
};

export default App;
