import axios from "axios";
import React, { useEffect, useState } from "react";
import C from "react-multi-carousel";
import Sliderdata from "./Sliderdata";
import "react-multi-carousel/lib/styles.css";

const responsive = {
	desktop: {
		breakpoint: { max: 4000, min: 375 },
		items: 1,
		slidesToSlide: 1,
	},
	mobile: {
		breakpoint: { max: 375, min: 0 },
		items: 1,
		slidesToSlide: 1,
	},
};

function Heroslider() {
	const Carousel = C.default ? C.default : C;

	const [sliderInfo, setSliderInfo] = useState([]);

	useEffect(() => {
		const getSliderInfo = () => {
			axios
				.get(`${import.meta.env.VITE_URL_SPHERUS_API}/hero_slider`)
				.then((res) => {
					if (res.data && Array.isArray(res.data)) setSliderInfo(res.data);
				});
		};
		getSliderInfo();
	}, []);

	return (
		<div className="heroslider">
			{sliderInfo.length >= 1 && (
				<Carousel
					containerClass="heroslider_carousel"
					responsive={responsive}
					infinite
					showDots
				>
					{sliderInfo.map((infos) => {
						return (
							<div key={infos.id}>
								<Sliderdata
									id={infos.id}
									title={infos.title}
									date={infos.date}
									url={infos.url}
									display={infos.display}
								/>
							</div>
						);
					})}
				</Carousel>
			)}
		</div>
	);
}

export default Heroslider;
