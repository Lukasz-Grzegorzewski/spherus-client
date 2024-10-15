import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

function TitleFixtures() {
	const [titleFix, setTitleFix] = useState([]);
	const [fixName, setFixName] = useState("");
	const [displayTitleInput, setDisplayTitleInput] = useState(false);

	const getFixturesName = useCallback(() => {
		axios
			.get(`${import.meta.env.VITE_URL_SPHERUS_API}/display_fixtures`)
			.then((res) => setTitleFix(res.data))
			.catch((err) => console.error(err));
	}, []);

	const handleUpdateTitle = () => {
		axios
			.patch(`${import.meta.env.VITE_URL_SPHERUS_API}/display_fixtures`, {
				fixName,
			})
			.then(() => getFixturesName());
	};

	const titleHandler = () =>
		!displayTitleInput
			? setDisplayTitleInput(true)
			: setDisplayTitleInput(false);

	useEffect(() => {
		getFixturesName();
	}, [getFixturesName]);

	return (
		<div className="title_fixtures_component">
			<div className="title_fixtures_component_title">
				<h1>Current title: {titleFix.name}</h1>
				<button
					className="icon-btn add-btn"
					type="button"
					onClick={() => {
						titleHandler();
					}}
				>
					<div className="btn-txt">Modify</div>
					<div className="add-icon" />
				</button>
			</div>
			{displayTitleInput ? (
				<div className="title_fixtures_component_input">
					<input
						className="title_fixtures_component_input_input"
						type="input"
						value={fixName}
						onChange={(e) => setFixName(e.target.value)}
					/>
					<button
						className="title_fixtures_component_input_btn"
						type="button"
						onClick={() => {
							handleUpdateTitle();
							setFixName("");
							setDisplayTitleInput(false);
						}}
					>
						Submit
					</button>
				</div>
			) : null}
		</div>
	);
}

export default TitleFixtures;
