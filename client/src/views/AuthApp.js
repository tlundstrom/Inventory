import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Mobile from "./Mobile";

const AuthApp = (props) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		window.addEventListener("resize", handleResize);
	}, []);
	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	};
	const isMobile = () => {
		return windowWidth <= 500 ? true : false;
	};

	return (
		<BrowserRouter>
			<section className="App">
				<Routes>
					{isMobile() ? <Route element={<Mobile />} path="/home/*" /> : <Route element={<Dashboard />} path="/home/*" />}
					{isMobile() ? <Route element={<Mobile />} path="/home/*" /> : <Route element={<Dashboard />} path="*" />}
				</Routes>
			</section>
		</BrowserRouter>
	);
};

export default AuthApp;
