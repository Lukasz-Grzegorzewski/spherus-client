import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import PopupVideo from "./PopupVideo";

function DeleteVideo({ video, getVideo }) {
	const [videoId, setVideoId] = useState([]);
	const [check, setCheck] = useState(false);
	const deleteVideo = () => {
		axios
			.delete(`${import.meta.env.VITE_URL_SPHERUS_API}/api/videos/${videoId}`)
			.then(() => {
				setCheck(true);
				getVideo();
			})
			.catch(() => {
				console.error("video not found");
			});
	};

	return (
		<div className="delete_video_container">
			<h2>Delete a video</h2>
			{check === false ? (
				<div>
					<div className="delete_video_selection">
						{video.length > 0 && (
							<select
								className="delete_video_select"
								onChange={(e) => setVideoId(e.target.value)}
							>
								<option value="">---</option>
								{video.map((v) => (
									<option key={v.id} value={v.id}>
										{v.title}
									</option>
								))}
							</select>
						)}

						<button
							className="deleteBtn delete_Btn"
							type="button"
							onClick={deleteVideo}
						>
							Delete video
						</button>
					</div>
				</div>
			) : (
				<div>
					<PopupVideo setCheck={setCheck} />
				</div>
			)}
		</div>
	);
}
DeleteVideo.propTypes = {
	video: PropTypes.arrayOf(
		PropTypes.shape({
			date: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			display: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		}),
	).isRequired,
	getVideo: PropTypes.func.isRequired,
};
export default DeleteVideo;
