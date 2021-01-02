import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
const weatherDataURL = `http://api.weatherstack.com/current?access_key=${api_key}&query=`;

const getWeather = (str) => {
	const request = axios.get(`${weatherDataURL}${str}`);
	return request.then((response) => response.data);
};

export default getWeather;
