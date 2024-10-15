import axios from "axios";
import React, { useState, useEffect } from "react";
import Section from "../section/Section";

function HomeDisplay() {
	const [currentHome, setCurrentHome] = useState([]);

	useEffect(() => {
		const getHome = () => {
			axios
				.get(`${import.meta.env.VITE_URL_SPHERUS_API}/home`)
				.then((res) => {
					if (res.data && Array.isArray(res.data)) setCurrentHome(res.data);
				})
				.catch((err) => console.error(err));
		};
		getHome();
	}, []);

	return (
		<div className="homeDisplay">
			{currentHome.length >= 1 && (
				<div>
					{currentHome.map((infos) => {
						return (
							<div key={infos.id}>
								<Section
									type={infos.type}
									id={infos.id}
									idLink={infos.idLink}
								/>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default HomeDisplay;
