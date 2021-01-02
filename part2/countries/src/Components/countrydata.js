import React from "react";
import getWeather from "../Services/weather";

const CountryData = ({ country }) => {
	const { name, capital, population, languages, flag } = country;

	const [weatherData, setWeatherData] = React.useState({});

	const fetchWeather = () => {
		getWeather(name).then((returnedData) =>
			setWeatherData(returnedData.current)
		);
	};

	React.useEffect(fetchWeather, [name]);
	console.log("Country Weather Data", weatherData);

	const { temperature, weather_icons, wind_speed, wind_dir } = weatherData;

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
			<h2>Weather in {capital}</h2>
			<h5>Temperature: {temperature} Celsius</h5>
			<img src={weather_icons} />
			<h5>
				Wind: {wind_speed}mph, direction {wind_dir}
			</h5>
		</div>
	);
};

export default CountryData;
