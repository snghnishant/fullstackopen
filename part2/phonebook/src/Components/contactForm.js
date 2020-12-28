import React from "react";

const ContactForm = ({ value1, handler1, value2, handler2, handler3 }) => {
	return (
		<form>
			<div>
				NAME: <input value={value1} onChange={handler1} /> <br />
				PHONE: <input value={value2} onChange={handler2} /> <br />
			</div>
			<div>
				<button type="submit" onClick={handler3}>
					Add Contact
				</button>
			</div>
		</form>
	);
};

export default ContactForm;
