import PropTypes from "prop-types";
import React from "react";
import { FaArrowCircleRight, FaSkull } from "react-icons/fa";

function WhyRegister({ setControlWhyRegisterPopUp }) {
	function closePopUp() {
		setControlWhyRegisterPopUp(false);
	}

	return (
		<div className="register-popup">
			<div className="register_card">
				<button type="button" aria-label="close popup" onClick={closePopUp}>
					<FaSkull className="close_btn" />
				</button>
				<h2>Why signing up on Spherus?</h2>

				<p>
					{" "}
					When you sign up on Spherus, you get access to exclusive content{" "}
				</p>

				<div className="howToSetFav">
					<div>
						<img
							src={`${
								import.meta.env.VITE_URL_SPHERUS_API
							}/assets/images/front/vignette_locked.png`}
							alt="vignette_locked"
						/>
					</div>
					<FaArrowCircleRight className="arrow" />
					<div>
						<img
							src={`${
								import.meta.env.VITE_URL_SPHERUS_API
							}/assets/images/front/vignette_unlocked.png`}
							alt="vignette_unlocked"
						/>
					</div>
				</div>
				<p>
					{" "}
					You can add videos to your dedicated Favorite Page by a simple click
					on the star on the top right of the video
				</p>

				<div className="howToSetFav">
					<div>
						<img
							src={`${
								import.meta.env.VITE_URL_SPHERUS_API
							}/assets/images/front/vignette_etoile_vide.png`}
							alt="vignette_etoile_vide"
						/>
					</div>
					<FaArrowCircleRight className="arrow" />
					<div>
						<img
							src={`${
								import.meta.env.VITE_URL_SPHERUS_API
							}/assets/images/front/vignette_etoile_pleine.png`}
							alt="vignette_etoile_pleine"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
WhyRegister.propTypes = {
	setControlWhyRegisterPopUp: PropTypes.func.isRequired,
};

export default WhyRegister;
