import PropTypes from "prop-types";
import React, { useContext, useRef, useState } from "react";
import { CiLock } from "react-icons/ci";
import { FaAngleLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

function Video({ title, description, arrCatName, date, display, videoUrl }) {
	const [isHovering, setIsHovering] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isPausing, setIsPausing] = useState(false);

	const { userToken } = useContext(UserContext);

	const refVideo = useRef();
	const url = `${import.meta.env.VITE_URL_SPHERUS_API}${videoUrl}`;

	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};

	function handleOnPlay() {
		setIsPlaying(true);
		setInterval(() => {
			setIsPlaying(false);
		}, 3000);
	}
	function handleOnPause() {
		setIsPausing(true);
		setInterval(() => {
			setIsPausing(false);
		}, 3000);
	}

	const navigate = useNavigate();

	return (
		<div className="video-component">
			{/* VIDEO */}
			<div
				className="video-player"
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				onFocus={handleMouseOver}
				onBlur={handleMouseOver}
			>
				{userToken || display === 1 ? (
					<video
						ref={refVideo}
						onPlay={handleOnPlay}
						onPause={handleOnPause}
						className="video"
						src={url}
						controls
					>
						<track kind="captions" />
					</video>
				) : (
					<video
						ref={refVideo}
						onPlay={handleOnPlay}
						className="video locked"
						src={url}
					>
						<track kind="captions" />
					</video>
				)}
				{(isHovering || isPlaying || isPausing) && (
					<div className="info-video">
						<p className="video-title">{title}</p>
						<p className="video-date">Date : {date}</p>
						<div className="video-categories-container">
							Category :
							{arrCatName?.map((item, index) => {
								return (
									<p key={item} className="video-category">
										{item} {arrCatName.length !== index + 1 ? "," : ""}
									</p>
								);
							})}
						</div>
					</div>
				)}
			</div>
			{/* END VIDEO */}
			{/* DESCRIPTION */}
			<div className="description">
				{/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/control-has-associated-label */}
				<button
					type="button"
					className="prevBtn"
					onClick={() => {
						navigate(-1);
					}}
				>
					<FaAngleLeft className="arrow" />
				</button>

				{!userToken && display === 0 && (
					<div className="lock-container">
						<CiLock className="lock-icon" />
						<p className="lock-desc">
							Content is not available for non subscribers
						</p>
						<button type="button" className="btn btn-subscribe">
							<NavLink to="/registration">Subscribe</NavLink>
						</button>
					</div>
				)}
				<div className="info_container">
					<hr />
					<p className="info-video-title">{title}</p>
					<p className="video-date">Date : {date}</p>
					<div className="info-video-categories-container">
						Category :
						{arrCatName?.map((item) => {
							return (
								<p key={item} className="info-video-category">
									{item}
								</p>
							);
						})}
					</div>
					<h1 className="info">Description</h1>
					<p className="p-desc">{description}</p>
					<hr />
				</div>
			</div>
			{/* END DESCRIPTION */}
		</div>
	);
}

export default Video;

Video.propTypes = {
	arrCatName: PropTypes.arrayOf(PropTypes.string).isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	videoUrl: PropTypes.string.isRequired,
	display: PropTypes.number.isRequired,
};
