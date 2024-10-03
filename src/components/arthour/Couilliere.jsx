import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

function Couilliere({ url }) {
	const [audio] = useState(new Audio(url));
	const [playing, setPlaying] = useState(false);

	const togglePlayBack = () => setPlaying(!playing);

	useEffect(() => {
		if (playing) {
			audio.play();
		} else {
			audio.pause();
		}
	}, [playing, audio]);

	useEffect(() => {
		audio.addEventListener("ended", () => setPlaying(false));
		return () => {
			audio.removeEventListener("ended", () => setPlaying(false));
		};
	}, [audio]);

	return (
		<div className="couilliere">
			<button className="couilliere_btn" type="button" onClick={togglePlayBack}>
				<div name={playing ? "pause" : "play"} />
				{playing ? "Pause" : "Play"}
			</button>
		</div>
	);
}

export default Couilliere;

Couilliere.propTypes = {
	url: PropTypes.string.isRequired,
};
