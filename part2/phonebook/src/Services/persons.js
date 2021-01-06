import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
	const request = axios.get(baseURL);
	return request.then((response) => response.data);
};

const addNew = (newData) => {
	const request = axios.post(baseURL, newData);
	return request.then((response) => response.data);
};

const deleteContact = (id) => {
	const request = axios.delete(`${baseURL}/${id}`);
	return request.then((response) => response.data);
};

export { getAll, addNew, deleteContact };
