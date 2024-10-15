import axios from "axios";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

function DeleteUser({ id }) {
	const navigate = useNavigate();
	const { isAdmin } = useContext(UserContext);

	function handleDelete() {
		axios
			.delete(`${import.meta.env.VITE_URL_SPHERUS_API}/users/${id}`)
			.then(() => {
				console.warn("user deleted successfully");
				if (isAdmin === 0) navigate("/registration");
			})
			.catch((err) => console.error("DELETE ERROR : ", err));
	}

	return (
		<button
			className="deleteBtn btn-delete"
			type="button"
			onClick={() => handleDelete()}
		>
			Delete
		</button>
	);
}

export default DeleteUser;

DeleteUser.propTypes = {
	id: PropTypes.number.isRequired,
};
