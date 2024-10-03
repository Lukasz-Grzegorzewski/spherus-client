import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import DeletePopUp from "./DeletePopUp";
import MessageConfirmation from "./MessageConfirmation";
import MessageErreur from "./MessageErreur";

function ButtonDeleteCat({ catId, getCategories, setCatId }) {
	const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
	const [confirmationMessageDelete, setConfirmationMessageDelete] =
		useState(false);
	const [errorMessageDelete, setErrorMessageDelete] = useState(false);
	function deleteCategory() {
		axios
			.delete(`${import.meta.env.VITE_URL_SPHERUS_API}/api/categories/${catId}`)
			.then(() => {
				getCategories();
				setOpenDeletePopUp(false);
				setConfirmationMessageDelete(true);
			})
			.catch((err) => {
				console.warn(err);
				setErrorMessageDelete(true);
			});
	}

	function handledeletePopUp() {
		setOpenDeletePopUp(!openDeletePopUp);
	}

	return (
		<div className="button_delete_category">
			<button
				type="button"
				className="deleteBtn category"
				onClick={handledeletePopUp}
			>
				Delete Category
			</button>
			{openDeletePopUp && (
				<DeletePopUp
					deleteCategory={() => deleteCategory()}
					setOpenDeletePopUp={() => setOpenDeletePopUp()}
					getCategories={() => getCategories()}
				/>
			)}
			{confirmationMessageDelete && (
				<MessageConfirmation
					setConfirmationMessageDelete={() => setConfirmationMessageDelete()}
					setCatId={(value) => setCatId(value)}
					getCategories={getCategories}
				/>
			)}
			{errorMessageDelete && (
				<MessageErreur errorMessageDelete={() => setErrorMessageDelete()} />
			)}
		</div>
	);
}

export default ButtonDeleteCat;

ButtonDeleteCat.propTypes = {
	getCategories: PropTypes.func.isRequired,
	catId: PropTypes.number.isRequired,
	setCatId: PropTypes.func.isRequired,
};
