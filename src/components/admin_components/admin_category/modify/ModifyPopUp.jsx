import PropTypes from "prop-types";
import React from "react";

function ModifyPopUp({ modifyCategory, handleModifyPopUp }) {
	return (
		<div className="delete_popup_box modify">
			<div className="popup_box">
				Do you really want to modify this category?
				<div className="buttons_popup">
					<form onSubmit={modifyCategory}>
						<button className="deleteBtn open" type="submit">
							YES
						</button>

						<button
							className="deleteBtn open"
							type="button"
							onClick={(e) => handleModifyPopUp(e)}
						>
							NO
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ModifyPopUp;
ModifyPopUp.propTypes = {
	modifyCategory: PropTypes.func.isRequired,
	handleModifyPopUp: PropTypes.func.isRequired,
};
