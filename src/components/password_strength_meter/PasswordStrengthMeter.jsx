import PropTypes from "prop-types";
import React from "react";
import zxcvbn from "zxcvbn";

function PasswordStrengthMeter({ password }) {
	const testResult = zxcvbn(password);
	const num = (testResult.score * 100) / 4;

	const createPasswordLabel = () => {
		switch (testResult.score) {
			case 0:
				return "Very weak";
			case 1:
				return "Weak";
			case 2:
				return "Fear";
			case 3:
				return "Good";
			case 4:
				return "Strong";
			default:
				return "";
		}
	};

	const funcProgressColor = () => {
		switch (testResult.score) {
			case 0:
				return "#828282";
			case 1:
				return "#EA1111";
			case 2:
				return "#FFAD00";
			case 3:
				return "#9BC158";
			case 4:
				return "#00B500";
			default:
				return "none";
		}
	};

	const changePasswordColor = () => ({
		width: `${num}%`,
		background: funcProgressColor(),
		height: "7px",
		margin: "0px",
		borderRadius: "12px",
		transition: "all 300ms ease-in-out",
	});

	return (
		<div style={{ width: "80%" }}>
			<div className="progress" style={{ height: "7px", margin: "0" }}>
				<div className="progress-bar" style={changePasswordColor()} />
			</div>
			<p style={{ color: funcProgressColor(), fontSize: "16px" }}>
				{createPasswordLabel()}
			</p>
		</div>
	);
}

export default PasswordStrengthMeter;

PasswordStrengthMeter.propTypes = {
	password: PropTypes.string.isRequired,
};
