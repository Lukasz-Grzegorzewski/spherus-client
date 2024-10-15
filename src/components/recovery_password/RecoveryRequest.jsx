import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecoveryRequest() {
	const [ifIdExist, setIfIdExist] = useState(true);
	const [userEmail, setUserEmail] = useState("");
	const navigate = useNavigate();

	function handleRandomCode(e) {
		e.preventDefault();
		const OTP = Math.floor(Math.random() * 9000 + 1000);

		if (userEmail) {
			axios
				.get(
					`${import.meta.env.VITE_URL_SPHERUS_API}/email/users/${userEmail}`,
				)
				.then((result) => {
					if (result.data.length > 0) {
						axios
							.post(
								`${import.meta.env.VITE_URL_SPHERUS_API}/send_recovery_email`,
								{
									OTP,
									recipientEmail: userEmail,
									id: result.data[0].id,
								},
							)
							.then(() => {
								navigate(`/recoveryrequest/${result.data[0].id}`, {
									state: { userEmail },
								});
								axios.patch(
									`${import.meta.env.VITE_URL_SPHERUS_API}/users/${
										result.data[0].id
									}`,
									{ codeTmp: Number(OTP) },
								);
							})
							.catch((err) => console.error(err));
					} else {
						setIfIdExist(false);
					}
				});
		}
	}

	return (
		<div className="login-page">
			<div className="login-pop-up">
				<div className="login-pop-up_card">
					<h2>Enter your email address</h2>
					<form className="login-form" onSubmit={handleRandomCode}>
						{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
						<label htmlFor="email">
							<input
								type="email"
								className="email"
								name="email"
								placeholder="Your email address"
								onClick={() => setIfIdExist(true)}
								onChange={(e) => setUserEmail(e.target.value)}
							/>
						</label>
						{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
						<label htmlFor="submit">
							<button className="submitBtn emailVerification" type="submit">
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
						</label>
						{!ifIdExist && <h3>This address doesn't exist in our database</h3>}
					</form>
				</div>
			</div>
		</div>
	);
}

export default RecoveryRequest;
