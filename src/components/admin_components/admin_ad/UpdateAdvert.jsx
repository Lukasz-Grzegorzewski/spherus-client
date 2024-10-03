import axios from "axios";
import PropTypes from "prop-types";
import React, { useState, useEffect, useCallback } from "react";
import PopupAdvertUpdate from "./PopupAdvertUpdate";

function UpdateAdvert({ pub, getPub }) {
	const [idPub, setIdPub] = useState("");
	const [infoPub, setInfoPub] = useState([]);
	const [check, setCheck] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [urlLink, setUrlLink] = useState("");

	const getAllPub = useCallback(() => {
		axios
			.get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/publicities/${idPub}`)
			.then((res) => {
				setInfoPub(res.data);
				setName(res.data.name);
				setDescription(res.data.description);
				setUrlLink(res.data.url_link);
			})
			.catch((error) => {
				console.warn(error);
			});
	}, [idPub]);

	useEffect(() => {
		getAllPub();
	}, [getAllPub]);

	function clearInputs() {
		setName("");
		setDescription("");
		setUrlLink("");
	}

	const updateAdd = () => {
		axios
			.put(`${import.meta.env.VITE_URL_SPHERUS_API}/api/publicities/${idPub}`, {
				description: `${description}`,
				urlLink: `${urlLink}`,
				name: `${name}`,
			})
			.then(() => {
				setCheck(true);
				clearInputs();
			})
			.catch(() => {
				console.error("advertising not uploaded");
			});
	};

	const handleChange = (e) => {
		setIdPub(e.target.value);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		updateAdd();
	};

	const videoUrl = `${import.meta.env.VITE_URL_SPHERUS_API}/${infoPub.url_image}`;

	return (
		<div className="addadvert">
			<form className="addadvert_form">
				<label className="deleteadvert_form_label" htmlFor="publicity-select">
					Choose advertising to update <br />
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
			</form>
			{idPub !== "" && (
				<form action="" onSubmit={handleUpdate} className="addadvert_form">
					<div className="addadvert_form_container">
						<img
							className="addadvert_form_container_screen"
							src={videoUrl}
							alt={infoPub.name}
						/>
						<label className="addadvert_form_container_label" htmlFor="name">
							Name
						</label>
						<input
							className="addadvert_form_container_input"
							type="text"
							id="name"
							value={name}
							placeholder="Update name"
							onChange={(e) => setName(e.target.value)}
							required
						/>

						<label
							className="addadvert_form_container_label"
							htmlFor="description"
						>
							Text
						</label>
						<textarea
							className="addadvert_form_container_textarea"
							type="text"
							id="description"
							value={description}
							placeholder="Update description"
							onChange={(e) => setDescription(e.target.value)}
							required
						/>

						<label className="addadvert_form_container_label" htmlFor="urlLink">
							Link to
						</label>
						<input
							className="addadvert_form_container_input"
							type="text"
							id="urlLink"
							value={urlLink}
							placeholder="Update link"
							onChange={(e) => setUrlLink(e.target.value)}
							required
						/>

						{check === false ? (
							<button className="submitBtn" type="submit" value="Upload">
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

								<span>Apply</span>
							</button>
						) : (
							<div className="addadvert_form_container">
								<PopupAdvertUpdate
									setIdPub={setIdPub}
									setCheck={setCheck}
									getPub={getPub}
								/>
							</div>
						)}
					</div>
				</form>
			)}
		</div>
	);
}

export default UpdateAdvert;

UpdateAdvert.propTypes = {
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
