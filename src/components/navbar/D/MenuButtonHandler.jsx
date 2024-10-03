import PropTypes from "prop-types";
import React from "react";

function MenuButtonHandler({ handleChange, menu }) {
	const buttonImageOne = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="50"
			height="100%"
			fill="#fc9918"
			className="bi bi-list"
			viewBox="0 0 16 16"
		>
			<title>Menu button handler</title>
			<path
				fillRule="evenodd"
				d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
			/>
		</svg>
	);

	const buttonImageTwo = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="50"
			height="100%"
			fill="#fc9918"
			className="bi bi-x-circle"
			viewBox="0 0 16 16"
		>
			<title>title</title>
			<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
			<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
		</svg>
	);

	function changeButtonImage() {
		handleChange();
	}

	return (
		<div className="menu-icon">
			{menu ? (
				<button
					className="button-menu-open"
					type="button"
					onClick={() => changeButtonImage()}
				>
					{buttonImageTwo}
				</button>
			) : (
				<button
					className="button-menu-close"
					type="button"
					onClick={() => changeButtonImage()}
				>
					{buttonImageOne}
				</button>
			)}
		</div>
	);
}

export default MenuButtonHandler;

MenuButtonHandler.propTypes = {
	menu: PropTypes.bool.isRequired,
	handleChange: PropTypes.func.isRequired,
};
