import PropTypes from "prop-types";
import React from "react";
import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	TwitterIcon,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from "react-share";

function Share({ title }) {
	const shareUrl = window.location.href;

	return (
		<div className="share_container">
			<div className="share_container_text">Share this video on: </div>
			<div className="Demo__some-network">
				<TwitterShareButton
					url={shareUrl}
					title={title}
					className="Demo__some-network__share-button"
				>
					<TwitterIcon size={25} round />
				</TwitterShareButton>
			</div>
			<div className="Demo__some-network">
				<FacebookShareButton
					url={shareUrl}
					quote={title}
					className="Demo__some-network__share-button"
				>
					<FacebookIcon size={25} round />
				</FacebookShareButton>
			</div>
			<div className="Demo__some-network">
				<WhatsappShareButton
					url={shareUrl}
					title={title}
					className="Demo__some-network__share-button"
				>
					<WhatsappIcon size={25} round />
				</WhatsappShareButton>
			</div>
			<div className="Demo__some-network">
				<EmailShareButton
					url={shareUrl}
					subject={title}
					body={title}
					className="Demo__some-network__share-button"
				>
					<EmailIcon size={25} round />
				</EmailShareButton>
			</div>
		</div>
	);
}

Share.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Share;
