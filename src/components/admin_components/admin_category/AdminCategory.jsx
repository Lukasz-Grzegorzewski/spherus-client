import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import Categories from "./Categories";
import ButtonOpenAddCat from "./add/ButtonOpenAddCat";

function AdminCategory() {
	const [selectCategory, setSelectCategory] = useState([]);
	const [catId, setCatId] = useState("Search category");
	const [catName, setCatName] = useState();
	const [showButtonAdd, setShowButtonAdd] = useState(false);

	const getCategories = useCallback(() => {
		axios
			.get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/categories`)
			.then((res) => {
				setSelectCategory(res.data);
			})
			.catch((err) => console.warn(err));
	}, []);

	useEffect(() => {
		getCategories();
	}, [getCategories]);

	const handleOptions = (elem) => {
		setCatId(elem.value);
		setCatName(elem.label);
	};

	function changeShowButtonAdd() {
		setShowButtonAdd(!showButtonAdd);
	}

	return (
		<div className="select-category">
			<div className="select-bar">
				{selectCategory && (
					<Select
						className="class_Text"
						options={selectCategory.map((elem) => ({
							label: elem.name,
							value: elem.id,
						}))}
						defaultValue={{ value: { catId }, label: "Search your category" }}
						onChange={(elem) => {
							handleOptions(elem);
							setShowButtonAdd(false);
						}}
					/>
				)}
			</div>

			<div className="add-button">
				<ButtonOpenAddCat
					getCategories={() => getCategories()}
					changeShowButtonAdd={() => changeShowButtonAdd()}
					showButtonAdd={showButtonAdd}
				/>

				{catId === "Search category" ? (
					""
				) : (
					<Categories
						catId={catId}
						setCatId={(value) => setCatId(value)}
						catName={catName}
						getCategories={getCategories}
						setCatName={(value) => setCatName(value)}
						setShowButtonAdd={() => setShowButtonAdd()}
					/>
				)}
			</div>
		</div>
	);
}
export default AdminCategory;
