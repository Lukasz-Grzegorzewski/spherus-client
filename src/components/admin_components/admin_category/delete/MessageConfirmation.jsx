import PropTypes from "prop-types";
import React from "react";

function MessageConfirmation({
	setConfirmationMessageDelete,
	setCatId,
	getCategories,
}) {
	return (
		<div className="message-confirmation">
			<div className="box-message-confirmation">
				<button
					type="button"
					className="close-message-button"
					onClick={() => {
						setConfirmationMessageDelete(false);
						setCatId("Search category");
						getCategories();
					}}
				>
					X
				</button>{" "}
				<p>The category has been deleted !</p>
			</div>
		</div>
	);
}

export default MessageConfirmation;

MessageConfirmation.propTypes = {
	setConfirmationMessageDelete: PropTypes.func.isRequired,
	setCatId: PropTypes.func.isRequired,
	getCategories: PropTypes.func.isRequired,
};
