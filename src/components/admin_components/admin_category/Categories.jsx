import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import HoverVideoPlayer from "react-hover-video-player";
import ShowVideos from "./add/ShowVideos";
import ButtonDeleteCat from "./delete/ButtonDeleteCat";
import ButtonOpenModify from "./modify/ButtonOpenModify";

function Categories({ catId, getCategories, catName, setCatId }) {
	const [selectVideos, setSelectVideos] = useState([]);
	const concat = `${import.meta.env.VITE_URL_SPHERUS_API}`;
	const [showSelectedVideos, setShowSelectedVideos] = useState(true);

	const getVideosByCategorie = useCallback(() => {
		axios
			.get(
				`${import.meta.env.VITE_URL_SPHERUS_API}/api/videos/categories/${catId}`,
			)
			.then((res) => {
				setSelectVideos(res.data);
			})
			.catch((err) => {
				console.warn(err);
			});
	}, []);

	useEffect(() => {
		getVideosByCategorie();
	}, [getVideosByCategorie]);

	function deleteVideoFromCat(videoId) {
		axios
			.delete(
				`${
					import.meta.env.VITE_URL_SPHERUS_API
				}/api/videos/cat/${videoId}/${catId}`,
			)
			.then(() => {
				getVideosByCategorie();
			})

			.catch((err) => console.warn(err));
	}
	const numAleat = Math.floor(Math.random() * 10);

	return (
		<div className="videos-by-cat">
			<div className="category-class-btn">
				<ButtonDeleteCat
					catId={catId}
					setCatId={(value) => setCatId(value)}
					getCategories={() => getCategories()}
				/>

				<ButtonOpenModify
					getCategories={() => getCategories()}
					catId={catId}
					catName={catName}
				/>

				<ShowVideos
					catId={catId}
					getVideosByCategorie={() => getVideosByCategorie()}
					setShowSelectedVideos={() =>
						setShowSelectedVideos(!showSelectedVideos)
					}
					selectVideos={selectVideos}
				/>
			</div>

			<div className={selectVideos.length > 0 ? "box-all-videos" : null}>
				{selectVideos &&
					showSelectedVideos &&
					typeof selectVideos ===
						"object" /* el código typeof escrito así permite esperar un objeto en este caso, y si no, no lo recibe */ &&
					selectVideos.map((elem) => (
						<div
							className="video-preview"
							key={`${elem.id}-${Math.floor(Math.random() * 100)}`}
						>
							<HoverVideoPlayer
								videoClassName="videocard_video"
								className="videocard_video"
								videoSrc={concat + elem.url}
								muted
								playbackRangeStart={numAleat}
								playbackRangeEnd={numAleat + 5}
							/>
							<p>{elem.title}</p>
							<button
								className="deleteBtn open cat"
								type="button"
								onClick={() => deleteVideoFromCat(elem.id)}
							>
								delete
							</button>
						</div>
					))}
			</div>
		</div>
	);
}

export default Categories;

Categories.propTypes = {
	catId: PropTypes.node.isRequired,
	catName: PropTypes.string.isRequired,
	getCategories: PropTypes.func.isRequired,
	setCatId: PropTypes.func.isRequired,
};
