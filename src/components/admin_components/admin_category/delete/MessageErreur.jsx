import PropTypes from "prop-types";
import React from "react";

function MessageErreur({ setErrorMessageDelete }) {
	return (
		<div className="message-confirmation">
			<div className="box-message-confirmation">
				<button type="button" onClick={() => setErrorMessageDelete(false)}>
					X
				</button>{" "}
				"error message"
			</div>
		</div>
	);
}

export default MessageErreur;

MessageErreur.propTypes = {
	setErrorMessageDelete: PropTypes.func.isRequired,
};
