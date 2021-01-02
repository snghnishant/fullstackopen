import React from "react";
import "./App.css";
import CountryData from "./Components/countrydata";
import getAll from "./Services/countries";

const CountryName = ({ name }) => {
	return (
		<div>
			<p>{name}</p>
		</div>
	);
};

const App = () => {
	const showInit = new Array(10).fill(false);

	const [searchStr, setSearchStr] = React.useState("");
	const [countries, setCountries] = React.useState([]);
	const [showData, setShowData] = React.useState(showInit);

	const moreFilters = "Too many matches, specify another filter";

	// Onchange Input handler
	const inputHandler = (event) => {
		setSearchStr(event.target.value);
		setShowData(showInit);
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
					<CountryData country={countries[0]} />
				) : countries.length <= 10 && countries.length > 0 ? (
					<div>
						{countries.map((country, index) => (
							<div>
								<CountryName key={index} name={country.name} />
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
									<CountryData country={country} />
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
