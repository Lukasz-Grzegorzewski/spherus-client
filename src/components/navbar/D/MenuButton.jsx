import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";

function MenuButton({ name, id, onclick, urlLink }) {
	return (
		<div className="menubutton">
			<NavLink to={urlLink}>
				<button className={id} type="button" onClick={onclick}>
					{name}
				</button>
			</NavLink>
		</div>
	);
}

export default MenuButton;

MenuButton.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	onclick: PropTypes.func.isRequired,
	urlLink: PropTypes.string.isRequired,
};
