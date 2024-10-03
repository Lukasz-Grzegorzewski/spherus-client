import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

function UpdateUserByUser({ type, keyName, id, getUser, closeUpdateInput }) {
	const [data, setData] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		axios
			.patch(`${import.meta.env.VITE_URL_SPHERUS_API}/api/users/${id}`, {
				[keyName]: data,
			})
			.then(() => {
				console.warn("user updated");
				getUser();
				closeUpdateInput(false);
			})
			.catch((err) => console.error(err));
	}

	return (
		<form className="form-profile" action={`/users/${id}`} method="post">
			<input
				className="inputs-form"
				type={`${type}`}
				value={data}
				onChange={(event) => setData(event.target.value)}
				placeholder={`Enter new ${keyName}`}
			/>
			<button
				className="btn-input"
				type="submit"
				onClick={(event) => handleSubmit(event)}
			>
				<FaCheck />
				Update
			</button>
		</form>
	);
}

export default UpdateUserByUser;

UpdateUserByUser.propTypes = {
	keyName: PropTypes.string.isRequired,
	getUser: PropTypes.func.isRequired,
	closeUpdateInput: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	type: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
		.isRequired,
};
