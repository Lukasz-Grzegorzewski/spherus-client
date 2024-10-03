import PropTypes from "prop-types";
import React from "react";
import HoverVideoPlayer from "react-hover-video-player";

function VideoCard({ elem, showVideoCard, setShowVideoCard }) {
	const concat = `${import.meta.env.VITE_URL_SPHERUS_API}`;
	const numAleat = Math.floor(Math.random() * 10);
	return (
		<div className="video-preview">
			<button
				className="deleteBtn close"
				type="button"
				onClick={() => setShowVideoCard(showVideoCard ? null : elem.id)}
			>
				<p>Show more</p>
			</button>
			{showVideoCard && showVideoCard === elem.id && (
				<HoverVideoPlayer
					videoClassName="videocard_video"
					className="videocard_video"
					videoSrc={concat + elem.url}
					muted
					playbackRangeStart={numAleat}
					playbackRangeEnd={numAleat + 6}
				/>
			)}
		</div>
	);
}

export default VideoCard;

VideoCard.propTypes = {
	elem: PropTypes.node.isRequired,
	showVideoCard: PropTypes.number.isRequired,
	setShowVideoCard: PropTypes.func.isRequired,
};
