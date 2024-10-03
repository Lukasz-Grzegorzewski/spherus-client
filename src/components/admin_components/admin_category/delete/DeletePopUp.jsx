import PropTypes from "prop-types";
import React from "react";

function DeletePopUp({ deleteCategory, setOpenDeletePopUp }) {
	return (
		<div className="delete_popup_box">
			<div className="popup_box">
				<p>Do you really want to delete this category?</p>

				<div className="buttons_popup">
					<button
						className="deleteBtn open"
						type="button"
						onClick={() => deleteCategory()}
					>
						YES
					</button>

					<button
						className="deleteBtn open"
						type="button"
						onClick={() => setOpenDeletePopUp(false)}
					>
						NO
					</button>
				</div>
			</div>
		</div>
	);
}
export default DeletePopUp;

DeletePopUp.propTypes = {
	deleteCategory: PropTypes.func.isRequired,
	setOpenDeletePopUp: PropTypes.func.isRequired,
};
