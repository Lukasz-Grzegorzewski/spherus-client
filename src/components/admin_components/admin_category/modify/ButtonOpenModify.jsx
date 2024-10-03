import PropTypes from "prop-types";
import React, { useState } from "react";
import ButtonModifyCat from "./ButtonModifyCat";

function ButtonOpenModify({ getCategories, catId, catName }) {
	document.activeElement?.blur();
	const [showButtonModify, setShowButtonModify] = useState(false);

	function changeShowButtonModify() {
		setShowButtonModify(!showButtonModify);
	}

	return (
		<div className="button-open-modify">
			{showButtonModify && (
				<ButtonModifyCat
					getCategories={() => getCategories()}
					catId={catId}
					catName={catName}
					changeShowButtonModify={() => changeShowButtonModify()}
				/>
			)}
			<button
				type="button"
				className={showButtonModify ? "deleteBtn close" : "deleteBtn open"}
				onClick={changeShowButtonModify}
			>
				{showButtonModify ? "X" : "Modify Category"}
			</button>
		</div>
	);
}

export default ButtonOpenModify;

ButtonOpenModify.propTypes = {
	getCategories: PropTypes.func.isRequired,
	catId: PropTypes.node.isRequired,
	catName: PropTypes.string.isRequired,
};
