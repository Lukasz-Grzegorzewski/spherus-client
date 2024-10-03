import PropTypes from "prop-types";
import HoverVideoPlayer from "react-hover-video-player";

function VideoCategory({ elem }) {
	const concat = `${import.meta.env.VITE_URL_SPHERUS_API}`;
	const numAleat = Math.floor(Math.random() * 10);
	return (
		<div
			className="video-info"
			// key={`${elem.id}-${Math.floor(Math.random() * 100)}`}
		>
			<HoverVideoPlayer
				videoClassName="videocard_video"
				className="videocard_video"
				videoSrc={concat + elem.url}
				muted
				playbackRangeStart={numAleat}
				playbackRangeEnd={numAleat + 6}
			/>
			<p className="card-title">{elem.title}</p>
		</div>
	);
}

export default VideoCategory;

VideoCategory.propTypes = {
	elem: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
	}).isRequired,
};
