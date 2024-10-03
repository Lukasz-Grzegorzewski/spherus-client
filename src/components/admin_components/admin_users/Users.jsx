import PropTypes from "prop-types";
import React from "react";
import { FaPen } from "react-icons/fa";

function Users({ id, email, setUserId, getUserById }) {
	return (
		<div className="label-container">
			<label className="label">
				<input
					className="input"
					type="radio"
					name="btn-user"
					value={id}
					onChange={(event) => {
						setUserId(event.target.value);
						getUserById(id);
					}}
				/>
				<div className="pen-plus-email">
					<FaPen className="pen" /> {email}
				</div>
			</label>
		</div>
	);
}

export default Users;

Users.propTypes = {
	id: PropTypes.number.isRequired,
	email: PropTypes.string.isRequired,
	setUserId: PropTypes.func.isRequired,
	getUserById: PropTypes.func.isRequired,
};
