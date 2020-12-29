import axios from "axios";

const baseURL = "https://restcountries.eu/rest/v2/name/";

const getAll = (str) => {
	const request = axios.get(`${baseURL}${str}`);
	return request.then((response) => response.data);
};

export default getAll;
