import axios from "axios";
import PropTypes from "prop-types";
import React, { useState, useEffect, useCallback } from "react";
import PopupAdvertDelete from "./PopupAdvertDelete";

function DeleteAdvert({ pub, getPub }) {
	const [idPub, setIdPub] = useState("");
	const [check, setCheck] = useState(false);
	const [screen, setScreen] = useState([]);
	const [view, setView] = useState(false);

	const videoUrl = `${import.meta.env.VITE_URL_SPHERUS_API}/${
		screen.url_image
	}`;

	const getImage = useCallback(() => {
		axios
			.get(`${import.meta.env.VITE_URL_SPHERUS_API}/publicities/${idPub}`)
			.then((res) => {
				setScreen(res.data);
			});
	}, [idPub]);

	useEffect(() => {
		getImage();
	}, [getImage]);

	const deletePub = () => {
		axios
			.delete(
				`${import.meta.env.VITE_URL_SPHERUS_API}/publicities/${idPub}`,
			)
			.then(() => {
				setCheck(true);
			})
			.catch((error) => {
				console.warn(error);
			});
	};

	const handleChange = (e) => {
		setIdPub(e.target.value);
		setView(true);
	};

	return (
		<div className="deleteadvert">
			{check === false ? (
				<form className="deleteadvert_form">
					<label className="deleteadvert_form_label" htmlFor="publicity-select">
						Choose advertising to delete <br />
						<select
							className="deleteadvert_form_label_select"
							id="publicity-select"
							onChange={handleChange}
						>
							<option value="">---</option>
							{pub.map((infos) => {
								return (
									<option key={infos.name} value={infos.id}>
										{infos.name}
									</option>
								);
							})}
						</select>
					</label>
					{view === true && idPub !== "" && (
						<div className="deleteadvert_form_screen">
							<img
								className="deleteadvert_form_screen"
								src={videoUrl}
								alt={screen.name}
							/>
							<p>{screen.description}</p>
						</div>
					)}
					<button
						className="deleteBtn delete"
						type="button"
						onClick={() => {
							deletePub();
						}}
					>
						Delete
					</button>
				</form>
			) : (
				<div className="deleteadvert_check">
					<PopupAdvertDelete
						setCheck={setCheck}
						getPub={getPub}
						setView={setView}
					/>
				</div>
			)}
		</div>
	);
}

export default DeleteAdvert;

DeleteAdvert.propTypes = {
	pub: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			url_image: PropTypes.string.isRequired,
			url_link: PropTypes.string.isRequired,
		}),
	).isRequired,
	getPub: PropTypes.func.isRequired,
};
