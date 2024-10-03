import PropTypes from "prop-types";
import React, { useState } from "react";
import MenuBurger from "../menus/MenuBurger";
import MenuSearch from "../menus/MenuSearch";

function NavbarMobile({ handlePopUpLogIn, handleRegisterPopUp }) {
	const [isBurgerClicked, setIsBurgerClicked] = useState(false);
	const [isLoopClicked, setIsLoopClicked] = useState(false);

	function handleBurgerClick() {
		setIsBurgerClicked(!isBurgerClicked);
	}

	return (
		<div className="navbar-mobile">
			{isLoopClicked ? (
				<MenuSearch setIsLoopClicked={() => setIsLoopClicked()} />
			) : (
				<button
					className="btn-svg"
					type="button"
					onClick={() => setIsLoopClicked(true)}
				>
					<svg
						className="loop"
						xmlns="http://www.w3.org/2000/svg"
						width="50px"
						height="50px"
						fill="currentColor"
						viewBox="0 0 16 20"
					>
						<title>Loop icon button</title>
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
					</svg>
				</button>
			)}
			<MenuBurger
				isBurgerClicked={isBurgerClicked}
				setIsBurgerClicked={() => setIsBurgerClicked()}
				handlePopUpLogIn={() => handlePopUpLogIn()}
				handleRegisterPopUp={() => handleRegisterPopUp()}
			/>

			<button
				type="button"
				className={isBurgerClicked ? "burger active" : "burger inactive"}
				onClick={(e) => {
					e.stopPropagation();
					handleBurgerClick();
				}}
			>
				<div className="bar bar1" />
				<div className="bar bar2" />
				<div className="bar bar3" />
			</button>
		</div>
	);
}

export default NavbarMobile;

NavbarMobile.propTypes = {
	handlePopUpLogIn: PropTypes.func.isRequired,
	handleRegisterPopUp: PropTypes.func.isRequired,
};
