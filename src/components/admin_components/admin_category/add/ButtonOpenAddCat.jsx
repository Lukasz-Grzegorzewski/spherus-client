import PropTypes from "prop-types";
import ButtonAddCat from "./ButtonAddCat";

function ButtonOpenAddCat({
	getCategories,
	changeShowButtonAdd,
	showButtonAdd,
}) {
	return (
		<div className="button_open_add_cat">
			<button
				type="button"
				className={showButtonAdd ? "deleteBtn close" : "deleteBtn open"}
				onClick={changeShowButtonAdd}
			>
				{showButtonAdd ? "X" : "Add a new Category"}
			</button>
			{showButtonAdd && (
				<ButtonAddCat
					getCategories={() => getCategories()}
					changeShowButtonAdd={() => changeShowButtonAdd()}
				/>
			)}
		</div>
	);
}

ButtonOpenAddCat.propTypes = {
	getCategories: PropTypes.func.isRequired,
	changeShowButtonAdd: PropTypes.func.isRequired,
	showButtonAdd: PropTypes.bool.isRequired,
};

export default ButtonOpenAddCat;
