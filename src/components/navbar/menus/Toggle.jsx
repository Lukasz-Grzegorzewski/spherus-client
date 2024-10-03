import React, { useContext } from "react";
import ThemeContext from "../../../contexts/ThemeContext";

function Toggle() {
	const { themeToggle, setThemeToggle } = useContext(ThemeContext);

	function handleToggle() {
		setThemeToggle(!themeToggle);
	}

	return (
		<div className="toggle-theme">
			<input
				className={
					themeToggle ? "toggle-input-mode light" : "toggle-input-mode dark"
				}
				id="check-theme"
				type="checkbox"
				onChange={() => handleToggle()}
				checked={!themeToggle}
			/>
			<label
				htmlFor="check-theme"
				className="label-input-mode"
				aria-controls="check-theme"
			>
				<p className="invis">|</p>
			</label>
		</div>
	);
}

export default Toggle;
