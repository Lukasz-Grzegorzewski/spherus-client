import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegistered } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/password_strength_meter/PasswordStrengthMeter";

function RegisterForm() {
	const [checkEmail, setCheckEmail] = useState(null);
	const [isUserCreated, setIsUserCreated] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstname: "",
			lastname: "",
			nickname: "",
			email: "",
			birthday: "",
			password: "",
		},
		mode: "onChange",
	});

	const password = watch("password", "");

	const postNewUser = (data) => {
		axios
			.post(`${import.meta.env.VITE_URL_SPHERUS_API}/users`, data)
			.then((res) => {
				console.warn(res);
				setIsUserCreated(true);
				setTimeout(() => {
					setIsUserCreated(false);
					navigate("/");
				}, 5000);
			})
			.catch((err) => {
				console.warn(err);
				setCheckEmail(1);
				console.warn(checkEmail);
			});
	};
	return (
		<div className="registration-page">
			<form
				className="_form"
				onSubmit={handleSubmit((data) => {
					postNewUser(data);
					reset();
					return console.warn("submitted :", data);
				})}
			>
				<FaRegistered className="register-icon" size={70} />
				<h1>Sign up</h1>
				<input
					{...register("firstname", {
						required: "with a minimum of 4 characters",
						minLength: {
							value: 4,
						},
					})}
					placeholder={
						errors.firstname ? "This field is required" : "Enter your firstname"
					}
				/>
				<input
					{...register("lastname", {
						required: "This field is required",
						minLength: {
							value: 4,
							message: "Min length is 4",
						},
					})}
					placeholder={
						errors.lastname ? errors.lastname?.message : "Enter your lastname"
					}
				/>
				<input
					{...register("nickname", {
						required: "This field is required",
						minLength: {
							value: 2,
							message: "Your nickname must have two characters minimum",
						},
					})}
					placeholder={
						errors.nickname
							? `${errors.nickname?.message}`
							: "Enter your nickname"
					}
				/>
				<input
					{...register("email", {
						required: "This field is required",
						minLength: {
							value: 4,
							message: "Min length is 4",
						},
						pattern: {
							value: /\S+@\S+\.\S+/,
							message:
								"This email is invalid. Are you sure it is correctly spelled?",
						},
					})}
					placeholder={
						checkEmail !== null
							? "This email is already used."
							: "Enter your email"
					}
					className={checkEmail === 1 ? "wrong-email" : ""}
					onClick={() => setCheckEmail(null)}
				/>
				<input
					type="date"
					{...register("birthday", {
						required: "This field is required",
						minLength: {
							value: 4,
							message: "Min length : 4 characters",
						},
					})}
					onClick={() => setCheckEmail(null)}
				/>
				<input
					type="password"
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 4,
							message: "Min length : 12 characters",
						},
					})}
					placeholder="Enter your password"
				/>
				<PasswordStrengthMeter
					password={password}
					className="password-strength-meter"
				/>
				{isUserCreated ? (
					<h3>Congratulations ! Your account is created.</h3>
				) : (
					<h3>...</h3>
				)}
				<button className="submitBtn registerForm" type="submit">
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

					<span>Submit</span>
				</button>
			</form>
		</div>
	);
}

export default RegisterForm;
