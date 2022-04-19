import { createContext, useState, useEffect } from "react";

const UserContext = createContext(false);

const UserProvider = ({ children }) => {
	const [auth, setAuth] = useState(() => {
		const sessionData = JSON.parse(sessionStorage.getItem("auth"));
		return sessionData;
	});

	const login = () => {
		setAuth(true);
	};

	const logout = () => {
		setAuth(false);
	};

	useEffect(() => {
		if (auth != null) {
			sessionStorage.setItem("auth", JSON.stringify(auth));
		}
	}, [auth]);
	return <UserContext.Provider value={{ auth, login, logout }}>{children}</UserContext.Provider>;
};
export { UserContext, UserProvider };
