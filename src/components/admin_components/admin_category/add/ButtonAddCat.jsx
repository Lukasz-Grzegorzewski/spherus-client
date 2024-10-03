import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";

function ButtonAddCat({ getCategories }) {
	const [addedCat, setAddedCat] = useState({ name: "" });
	const [errorMessageAdd, setErrorMessageAdd] = useState(false);
	const [sucessMessage, setSuccessMessage] = useState(false);
	function handleSubmit(e) {
		e.preventDefault();
		if (addedCat.name.trim() !== "" && addedCat.name.length >= 3) {
			axios
				.post(
					`${import.meta.env.VITE_URL_SPHERUS_API}/api/categories/`,
					addedCat,
				) /* addedCat es un objeto, como lo que se pone en Postman para añadir un user */
				.then(() => {
					getCategories();
					setSuccessMessage(true);
					setErrorMessageAdd(false);
				})
				.catch((err) => console.warn(err));
		} else {
			setErrorMessageAdd(true);
		}
	}

	return (
		<div className="open-add-box">
			<form
				className="add-form"
				action="/categories"
				method="post"
				onSubmit={(e) => handleSubmit(e)}
			>
				<input
					type="text"
					placeholder="name your category"
					value={addedCat.name}
					onChange={(e) => setAddedCat({ name: e.target.value })}
				/>
				<button className="submitBtn open" type="submit">
					<div className="svg-wrapper">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
							<title>Submit button</title>
							<path fill="none" d="M0 0h24v24H0z" />
							<path
								fill="currentColor"
								d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
							/>
						</svg>
					</div>

					<span>Add</span>
				</button>
				{sucessMessage === true && (
					<p>The category {addedCat.name} has been successfully added</p>
				)}
				{errorMessageAdd === true && (
					<div className="error-message-add">
						<p>The name cannot be empty or must have more than 3 characters</p>
					</div>
				)}
			</form>
		</div>
	);
}

export default ButtonAddCat;

ButtonAddCat.propTypes = {
	getCategories: PropTypes.func.isRequired,
};
