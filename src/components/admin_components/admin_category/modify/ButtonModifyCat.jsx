import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ModifyPopUp from "./ModifyPopUp";

function ButtonModifyCat({ getCategories, catId, catName }) {
	const [categoryModified, setCategoryModified] = useState("");
	const [openModifyPopUp, setOpenModifyPopUp] = useState(false);
	const [confirmationMessageModify, setConfirmationMessageModify] =
		useState(false);
	const [errorMessageModify, setErrorMessageModify] = useState(false);

	function modifyCategory(e) {
		e.preventDefault();
		axios
			.patch(
				`${import.meta.env.VITE_URL_SPHERUS_API}/categories/${catId}/`,
				{
					name: categoryModified,
				},
			)
			.then(() => {
				getCategories();
				setOpenModifyPopUp(false);
				setConfirmationMessageModify(true);
				/* changeShowButtonModify(); */
			})
			.catch((err) => {
				console.warn(err);
				setErrorMessageModify(true);
			});
	}

	function handleModifyPopUp(e) {
		e.preventDefault();
		if (categoryModified.trim() !== "" && categoryModified.length >= 3) {
			setOpenModifyPopUp(!openModifyPopUp);
		} else {
			setErrorMessageModify(true);
		}
	}

	return (
		<div className="modify-cat">
			<form onSubmit={handleModifyPopUp}>
				<input type="submit" className="deleteBtn open" value="Rename" />
				<input
					className="input-modify"
					type="text"
					placeholder={catName}
					value={categoryModified}
					onChange={(e) => setCategoryModified(e.target.value)}
				/>
			</form>
			{openModifyPopUp && (
				<ModifyPopUp
					modifyCategory={(e) => modifyCategory(e)}
					handleModifyPopUp={(e) => handleModifyPopUp(e)}
				/>
			)}
			{confirmationMessageModify === true && (
				<p>category name modified to "{categoryModified}"</p>
			)}
			{errorMessageModify === true && (
				<p>The name cannot be empty or must have more than 3 characters</p>
			)}
		</div>
	);
}

export default ButtonModifyCat;

ButtonModifyCat.propTypes = {
	catId: PropTypes.node.isRequired,
	catName: PropTypes.string.isRequired,
	getCategories: PropTypes.func.isRequired,
};
