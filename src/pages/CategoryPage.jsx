import CategoryVideo from "@components/category_video/CategoryVideo";
import Heroslider from "@components/heroSlider/Heroslider";
import React from "react";

function CategoryPage() {
	return (
		<div className="category-page">
			<Heroslider />
			<CategoryVideo />
		</div>
	);
}

export default CategoryPage;
