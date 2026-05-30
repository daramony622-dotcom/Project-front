import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartAlert from "../components/CartAlert";

const MainLayout = () => {
	return (
		<div>
			<Navbar />
			<CartAlert />
			<div>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
