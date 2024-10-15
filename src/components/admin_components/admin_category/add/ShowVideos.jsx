import axios from "axios";
import PropTypes from "prop-types";
import React, { useState, useEffect, useCallback } from "react";
import MessageErrorAdding from "./MessageErrorAdding";
import VideoCategory from "./VideoCategory";

function ShowVideos({
	catId,
	getVideosByCategorie,
	setShowSelectedVideos,
	selectVideos,
}) {
	const [showVids, setShowVids] = useState(false);
	const [getVideosForAdd, setGetVideosForAdd] = useState([]);
	const [pushArray, setPushArray] = useState([]);
	const [errorMessageSend, setErrorMessageSend] = useState(false);

	const getVideos = useCallback(() => {
		axios
			.get(`${import.meta.env.VITE_URL_SPHERUS_API}/videos`)
			.then((res) => {
				setGetVideosForAdd(res.data);
			})
			.catch((err) => console.warn(err));
	}, []);

	useEffect(() => {
		getVideos();
	}, [getVideos]);

	function handleshowVids() {
		setShowVids(!showVids);
		setShowSelectedVideos();
	}

	const handleCheckBox = (id) => {
		const found = pushArray.findIndex((elem) => elem === id);
		if (found === -1) {
			setPushArray([...pushArray, id]);
		} else {
			const tmp = pushArray.filter((elem) => elem !== id);
			setPushArray(tmp);
		}
	};

	function pushVideos() {
		if (pushArray.length > 0) {
			pushArray.forEach((elem) => {
				axios
					.post(`${import.meta.env.VITE_URL_SPHERUS_API}/category/video`, {
						videoId: elem,
						categoryId: catId,
					})
					.then(() => {
						getVideosByCategorie();
						handleshowVids(false);
						setPushArray([]);
						setErrorMessageSend(false);
					})
					.catch((err) => console.warn(err));
			});
		} else {
			setErrorMessageSend(true);
		}
	}

	const filterVideos = () => {
		return getVideosForAdd.filter(
			(item) => !selectVideos.some((video) => video.id === item.id),
		);
	};

	return (
		<div className="show-videos">
			<div className="open-all-buttons">
				{showVids && (
					<button
						className={showVids ? "submitBtn open" : "submitBtn close"}
						type="button"
						onClick={pushVideos}
					>
						<div className="svg-wrapper">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
							>
								<title>Submit button</title>
								<path fill="none" d="M0 0h24v24H0z" />
								<path
									fill="currentColor"
									d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
								/>
							</svg>
						</div>
						<span>Add videos</span>
					</button>
				)}

				<div className="open-add-videos-button">
					<button
						type="button"
						className={showVids ? "deleteBtn close" : "deleteBtn open"}
						onClick={() => handleshowVids()}
					>
						{showVids ? "X" : "Add videos"}
					</button>
				</div>
			</div>

			{errorMessageSend && (
				<MessageErrorAdding setErrorMessageSend={() => setErrorMessageSend()} />
			)}

			<div className={showVids ? "video-list-to-add" : null}>
				{showVids &&
					getVideosForAdd &&
					filterVideos().map((elem) => {
						return (
							<div key={elem.id}>
								<label
									className="video-list-to-add_label"
									htmlFor={elem.name}
									aria-label="catVideo label"
								>
									<VideoCategory elem={elem} />
									<input
										className="video-list-to-add_label_input"
										name={elem.name}
										type="checkbox"
										checked={
											!!(pushArray.length > 0 && pushArray.includes(elem.id))
										}
										onChange={() => handleCheckBox(elem.id)}
									/>
								</label>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default ShowVideos;

ShowVideos.propTypes = {
	getVideosByCategorie: PropTypes.func.isRequired,
	catId: PropTypes.node.isRequired,
	setShowSelectedVideos: PropTypes.func.isRequired,
	selectVideos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			cat: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			display: PropTypes.number.isRequired,
			url: PropTypes.string.isRequired,
			year: PropTypes.number.isRequired,
		}),
	).isRequired,
};
