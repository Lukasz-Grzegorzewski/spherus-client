import axios from "axios";
import React, {
	lazy,
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Route, Routes } from "react-router-dom";
import AvatarUrlContext from "./contexts/AvatarUrlContext";
import ThemeContext from "./contexts/ThemeContext";
import UserContext from "./contexts/UserContext";

const Home = lazy(() => import("./pages/Home"));
const Policy = lazy(
	() => import("./components/footer/legal_pages/policy/Policy"),
);
const Cookies = lazy(
	() => import("./components/footer/legal_pages/cookies/Cookies"),
);
const TermsOfServices = lazy(
	() =>
		import("./components/footer/legal_pages/termsofservices/TermsOfServices"),
);
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const RegisterForm = lazy(() => import("./pages/RegisterForm"));
const VideoPage = lazy(() => import("./pages/VideoPage"));
const Admin = lazy(() => import("./pages/Admin"));
const Page404 = lazy(() => import("./pages/Page404"));
const Profile = lazy(() => import("./pages/Profile"));
const Navbar = lazy(() => import("./components/navbar/Navbar"));
const Footer = lazy(() => import("./components/footer/Footer"));
const LoginPopUp = lazy(() => import("./components/loginPopUp/LoginPopUp"));
const RecoveryRequest = lazy(
	() => import("./components/recovery_password/RecoveryRequest"),
);
const EmailVerification = lazy(
	() => import("./components/recovery_password/EmailVerification"),
);
const ResetPassword = lazy(
	() => import("./components/recovery_password/ResetPassword"),
);
const Favorite = lazy(() => import("./components/favorite_page/Favorite"));
const WhyRegister = lazy(
	() => import("./components/navbar/whyregisterpopup/WhyRegister"),
);

export function doubleIt(value) {
	return value * 2;
}

function App() {
	const [controlPopUpLogIn, setControlPopUpLogIn] = useState(false);

	/* Avatar Context START */
	const [avatarUrlContext, setAvatarUrlContext] = useState(null);
	const avatarUrlControlObject = useMemo(() => {
		return { avatarUrlContext, setAvatarUrlContext };
	}, [avatarUrlContext]);

	function handlePopUpLogIn() {
		setControlPopUpLogIn(!controlPopUpLogIn);
	}

	const [controlWhyRegisterPopUp, setControlWhyRegisterPopUp] = useState(false);

	function handleRegisterPopUp() {
		setControlWhyRegisterPopUp(!controlWhyRegisterPopUp);
	}

	const [userContext, setUserContext] = useState({
		userToken: "",
		isAdmin: "",
		id: "",
	});

	const [themeToggle, setThemeToggle] = useState(false);

	const themeControlObject = useMemo(() => {
		return { themeToggle, setThemeToggle };
	}, [themeToggle]);

	const getUser = useCallback((tokeuUserId) => {
		axios
			.get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/users/${tokeuUserId}`)
			.then((res) => {
				setAvatarUrlContext(res.data.url);
			})
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		const userLocal = localStorage.getItem("token");
		if (userLocal) {
			const userParsed = JSON.parse(userLocal);
			setUserContext(userParsed);
			const { id: tokeuUserId } = userParsed;
			getUser(tokeuUserId);
		}
	}, [getUser]);

	return (
		<div className={!themeToggle ? "App dark-theme" : "App light-theme"}>
			<Suspense
				fallback={
					<div className="loader-container">
						<div className="spinner" />
						<p>Loading</p>
					</div>
				}
			>
				<ThemeContext.Provider value={themeControlObject}>
					<UserContext.Provider value={userContext}>
						<AvatarUrlContext.Provider value={avatarUrlControlObject}>
							<Navbar
								handlePopUpLogIn={() => {
									handlePopUpLogIn();
								}}
								handleRegisterPopUp={() => {
									handleRegisterPopUp();
								}}
							/>
							<div className="body">
								<Routes>
									<Route path="/" element={<Home />} />
									<Route path="/policy" element={<Policy />} />
									<Route path="/cookies" element={<Cookies />} />
									<Route
										path="/termsofservices"
										element={<TermsOfServices />}
									/>
									<Route path="/categories/:id" element={<CategoryPage />} />
									<Route path="/registration" element={<RegisterForm />} />
									<Route path="/video/:id" element={<VideoPage />} />
									<Route path="/forgot" element={<RecoveryRequest />} />
									<Route
										path="/recoveryrequest/:id"
										element={<EmailVerification />}
									/>
									<Route path="/reset" element={<ResetPassword />} />
									{userContext.id !== "" && (
										<Route
											path="/profile"
											element={<Profile iduser={userContext.id} />}
										/>
									)}
									{userContext.isAdmin === 1 && (
										<Route path="/admin" element={<Admin />} />
									)}

									<Route path="/*" element={<Page404 />} />
									<Route path="/favorite" element={<Favorite />} />
								</Routes>
							</div>
							<Footer />
						</AvatarUrlContext.Provider>
					</UserContext.Provider>
				</ThemeContext.Provider>
				{controlPopUpLogIn && (
					<LoginPopUp
						setUserContext={setUserContext}
						setControlPopUpLogIn={setControlPopUpLogIn}
					/>
				)}
				{controlWhyRegisterPopUp && (
					<WhyRegister
						setControlWhyRegisterPopUp={setControlWhyRegisterPopUp}
					/>
				)}
			</Suspense>
		</div>
	);
}

export default App;
