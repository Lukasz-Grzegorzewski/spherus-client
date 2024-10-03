import React, { lazy, Suspense } from "react";

const HomeDisplay = lazy(() => import("../components/homeDisplay/HomeDisplay"));
const Fixtures = lazy(() => import("../components/fixtures/Fixtures"));
const Heroslider = lazy(() => import("../components/heroSlider/Heroslider"));

export default function Home() {
	return (
		<div className="home">
			<Suspense
				fallback={
					<div className="loader-container">
						<div className="spinner" />
						<p>Loading</p>
					</div>
				}
			>
				<Heroslider />
				<Fixtures />
				<div className="home_display">
					<HomeDisplay />
				</div>
			</Suspense>
		</div>
	);
}
