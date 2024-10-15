import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import AddFixtures from "./AddFixtures";
import DeleteFixtures from "./DeleteFixtures";
import TitleFixtures from "./TitleFixtures";

function AdminFixtures() {
	const [fixturesData, setFixturesData] = useState([]);
	const [getAllCategories, setGetAllCategories] = useState([]);
	const [add, setAdd] = useState(false);

	const getHeroInfo = useCallback(() => {
		axios
			.get(`${import.meta.env.VITE_URL_SPHERUS_API}/fixtures`)
			.then((res) => setFixturesData(res.data))
			.catch((err) => console.error(err));
	}, []);
	const getCategories = useCallback(() => {
		axios
			.get(`${import.meta.env.VITE_URL_SPHERUS_API}/categories`)
			.then((res) => setGetAllCategories(res.data))
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		getHeroInfo();
		getCategories();
	}, [getCategories, getHeroInfo]);

	return (
		<div className="fixtures-slider">
			<div className="fixtures-slider_text">
				<TitleFixtures />
			</div>
			<div className="fixtures-slider_text">
				<h1>Currently in the Fixture</h1>
				<button
					className="icon-btn add-btn"
					type="button"
					onClick={() => setAdd(!add)}
				>
					<div className="btn-txt">Add Video</div>
					<div className="add-icon" />
				</button>
			</div>
			<div className="fixtures-selector-component">
				{add && getAllCategories.length > 0 && (
					<AddFixtures
						getAllCategories={getAllCategories}
						getFixtures={() => getHeroInfo()}
						setAdd={setAdd}
					/>
				)}
			</div>
			<ul className="adminheroslider_videos">
				{fixturesData.length >= 1 &&
					fixturesData.map((el) => {
						return (
							<DeleteFixtures
								key={el.id}
								el={el}
								getHeroInfo={() => getHeroInfo()}
							/>
						);
					})}
			</ul>
		</div>
	);
}

export default AdminFixtures;
