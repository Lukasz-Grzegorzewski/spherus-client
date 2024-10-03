import PropTypes from "prop-types";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuButton from "./MenuButton";
import MenuButtonHandler from "./MenuButtonHandler";

function Navbar({ handlePopUpLogIn }) {
	const [menu, setMenu] = useState(false);

	function test() {
		console.warn("onclick");
	}

	const buttonList = [
		{
			name: "Why Subscribe?",
			buttonid: 1,
			urlLink: "/registration",
			onclick: test,
		},
		{
			name: "Log in",
			buttonid: 2,
			onclick: handlePopUpLogIn,
			urlLink: "/registration",
		},
		{
			name: "Sing In",
			buttonid: 3,
			urlLink: "/registration",
			onclick: test,
		},
		{
			name: "Light Mode",
			buttonid: 4,
			urlLink: "/registration",
			onclick: test,
		},
	];

	function handleChange() {
		setMenu(!menu);
	}

	return (
		<div className="navbar">
			<div className="show-menu">
				<div className="navbar_container_logo">
					<MenuButtonHandler menu={menu} handleChange={() => handleChange()} />
				</div>

				<div className={menu ? "menuOn" : "menuOff"}>
					{buttonList.map((button) => (
						<MenuButton
							name={button.name}
							id={button.buttonid}
							key={button.buttonid}
							onclick={button.onclick}
							urlLink={button.urlLink}
						/>
					))}
				</div>
			</div>

			<div className="navbar_container_logo">
				<NavLink to="/">
					<img
						className="navbar_logo"
						src="/src/assets/images/logo_sphereus.png"
						alt="sphereus"
					/>
				</NavLink>
			</div>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="50px"
				height="50px"
				fill="currentColor"
				className="bi bi-search"
				viewBox="0 0 16 20"
			>
				<title>title</title>
				<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
			</svg>
		</div>
	);
}

export default Navbar;

Navbar.propTypes = {
	handlePopUpLogIn: PropTypes.func.isRequired,
};
