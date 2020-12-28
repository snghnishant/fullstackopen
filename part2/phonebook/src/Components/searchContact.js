import React from "react";

const SearchForm = ({ filterName, event }) => {
	return (
		<div>
			Search Contacts: <input value={filterName} onChange={event} />
		</div>
	);
};

export default SearchForm;
