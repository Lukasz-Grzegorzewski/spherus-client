import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";

function AddFixtures({ getFixtures, getAllCategories, setAdd }) {
	const [allVideos, setAllVideos] = useState(null);
	const [valueVideo, setValueVideo] = useState({ fkVideo: null });

	const postFixture = () => {
		axios
			.post(`${import.meta.env.VITE_URL_SPHERUS_API}/fixtures`, valueVideo)
			.then(() => {
				getFixtures();
				setAdd(false);
			})
			.catch((err) => console.error(err));
	};

	function getVideos(id) {
		axios
			.get(
				`${import.meta.env.VITE_URL_SPHERUS_API}/videos/categories/${id}`,
			)
			.then((res) => setAllVideos(res.data))
			.catch((err) => console.error(err));
	}

	function handleChange(e) {
		getVideos(e.target.value);
	}

	function handleChange2(e) {
		setValueVideo({ fkVideo: e.target.value });
	}

	return (
		<div className="fixtures-add-selector">
			<h1 className="addhero_title">Add new video</h1>
			<select
				className="addhero_cat_name_select"
				onChange={(e) => handleChange(e)}
			>
				<option value="">---</option>
				{getAllCategories.map((el) => {
					return (
						<option key={el.id} value={el.id}>
							{el.name}
						</option>
					);
				})}
			</select>
			{allVideos && (
				<select
					className="addhero_cat_name_select"
					onChange={(e) => handleChange2(e)}
				>
					<option value="">---</option>
					{allVideos.map((el) => {
						return (
							<option key={el.id} value={el.id}>
								{el.title}
							</option>
						);
					})}
				</select>
			)}
			{valueVideo.fkVideo !== null && (
				<button
					className="submitBtn addFixtures_btn"
					type="button"
					onClick={() => {
						postFixture();
					}}
				>
					<div className="svg-wrapper">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
							<title>Upload button</title>
							<path fill="none" d="M0 0h24v24H0z" />
							<path
								fill="currentColor"
								d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
							/>
						</svg>
					</div>
					<span>Submit</span>
				</button>
			)}
		</div>
	);
}

export default AddFixtures;

AddFixtures.propTypes = {
	setAdd: PropTypes.bool.isRequired,
	getFixtures: PropTypes.func.isRequired,
	getAllCategories: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
		}),
	).isRequired,
};
