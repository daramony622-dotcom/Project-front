import { useEffect, useState } from "react";
import { DarkModeContext } from "./darkModeContextCreate";

export const DarkModeProvider = ({ children }) => {
	const [isDark, setIsDark] = useState(() => {
		// Check localStorage first
		const saved = localStorage.getItem("darkMode");
		if (saved !== null) {
			return JSON.parse(saved);
		}
		// Check system preference
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	useEffect(() => {
		// Update localStorage and DOM
		localStorage.setItem("darkMode", JSON.stringify(isDark));
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDark]);

	const toggleDarkMode = () => {
		setIsDark((prev) => !prev);
	};

	return (
		<DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};
