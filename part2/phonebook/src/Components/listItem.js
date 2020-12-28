import React from "react";

const ListItem = ({ name, phone }) => {
	return (
		<li>
			{name} : {phone}
		</li>
	);
};

export default ListItem;
