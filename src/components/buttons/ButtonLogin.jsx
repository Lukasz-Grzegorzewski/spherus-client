import React from "react";
import { CiLogin } from "react-icons/ci";

function Button() {
	return (
		<div className="button-container">
			<div className="thumbnail-container">
				<button className="button-login" type="button">
					<CiLogin />
					Login
				</button>
			</div>
		</div>
	);
}

export default Button;
