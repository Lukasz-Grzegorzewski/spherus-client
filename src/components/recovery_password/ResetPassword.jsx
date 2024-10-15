import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Recovered() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [validation, setValidation] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const updatePassword = () => {
		axios
			.patch(`${import.meta.env.VITE_URL_SPHERUS_API}/users/${id}`, {
				password,
			})
			.then(() => {
				setPassword("");
				setConfirmPassword("");
				setTimeout(() => {
					navigate("/");
				}, 5000);
			})
			.catch((err) => console.error(err));
	};

	return !validation ? (
		<form className="_password-validation">
			{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
			<label htmlFor="password">
				<input
					type="password"
					className="password"
					name="email"
					placeholder="Enter your new password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
			</label>
			{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
			<label htmlFor="password">
				<input
					type="password"
					className="password"
					name="email"
					placeholder="Repeat your new password"
					value={confirmPassword}
					onChange={(e) => {
						setConfirmPassword(e.target.value);
					}}
				/>
			</label>
			<div
				className={
					password === confirmPassword && password !== ""
						? "_validate"
						: "_unvalidate"
				}
			>
				{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
				<label htmlFor="button">
					<input
						name="submit"
						type="button"
						value="Confirm"
						onClick={() => {
							updatePassword();
							setValidation(true);
						}}
					/>
				</label>
			</div>
		</form>
	) : (
		<form className="_password-validation">
			<p>Congratulation, your password has been updated !</p>
			<div className="success-checkmark">
				<div className="check-icon">
					{" "}
					<span className="icon-line line-tip" />{" "}
					<span className="icon-line line-long" />
					<div className="icon-circle" /> <div className="icon-fix" />
				</div>
			</div>
		</form>
	);
}

export default Recovered;
