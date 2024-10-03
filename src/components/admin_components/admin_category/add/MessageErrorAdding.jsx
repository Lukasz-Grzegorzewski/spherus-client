import PropTypes from "prop-types";
import React from "react";

function MessageErrorAdding({ setErrorMessageSend }) {
	return (
		<div className="message-confirmation">
			<div className="box-message-confirmation">
				<button
					type="button"
					className="close-message-button"
					onClick={() => setErrorMessageSend(false)}
				>
					X
				</button>{" "}
				<p>You must select one video at least !</p>
			</div>
		</div>
	);
}

export default MessageErrorAdding;

MessageErrorAdding.propTypes = {
	setErrorMessageSend: PropTypes.func.isRequired,
};
