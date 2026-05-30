import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
	const location = useLocation();

	useEffect(() => {
		const elements = document.querySelectorAll(".reveal-on-scroll");
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("visible");
					} else {
						entry.target.classList.remove("visible");
					}
				});
			},
			{ threshold: 0.2 },
		);

		elements.forEach((element) => observer.observe(element));
		return () => observer.disconnect();
	}, [location.pathname]);

	return (
		<div className="min-h-screen">
			<AppRoutes />
		</div>
	);
};

export default App;
