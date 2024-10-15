import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import AddAdvert from "./AddAdvert";
import DeleteAdvert from "./DeleteAdvert";
import UpdateAdvert from "./UpdateAdvert";

function AdminAd() {
	const [pub, setPub] = useState([]);

	const getPub = useCallback(() => {
		axios
			.get(`${import.meta.env.VITE_URL_SPHERUS_API}/publicities`)
			.then((res) => {
				setPub(res.data);
			});
	}, []);

	useEffect(() => {
		getPub();
	}, [getPub]);

	return (
		<div className="adminad">
			<div className="adminad_box">
				<h1 className="adminad_box_title">Add new Advert</h1>
				<AddAdvert getPub={getPub} />
			</div>
			<div className="adminad_separate" />
			<div className="adminad_box">
				<h1 className="adminad_box_title">Update Advert</h1>
				{pub.length >= 1 && <UpdateAdvert pub={pub} getPub={getPub} />}
			</div>
			<div className="adminad_separate" />
			<div className="adminad_box">
				<h1 className="adminad_box_title">Delete Advert</h1>
				{pub.length >= 1 && <DeleteAdvert pub={pub} getPub={getPub} />}
			</div>
		</div>
	);
}

export default AdminAd;
