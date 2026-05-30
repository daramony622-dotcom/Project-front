import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../page/HomePage";
import AboutPage from "../page/AboutPage";
import MenuPage from "../page/MenuPage";
import ProductHoodies from "../page/products/ProductHoodies";
import ProductJeans from "../page/products/ProductJeans";
import ProductShirt from "../page/products/ProductShirt";
import ProductShoes from "../page/products/ProductShoes";
import AddToCart from "../cart/AddToCart";
import LoginPage from "../page/LoginPage";
import ScrollToUp from "./ScrollToUp";
import Contact from "../page/Contact";
import ProductDetails from "../cart/ProductDetails";

const AppRoutes = () => {
	return (
		<>
			<ScrollToUp />
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<LoginPage />} />
				<Route path="/" element={<MainLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="about" element={<AboutPage />} />
					<Route path="menu" element={<MenuPage />} />
					<Route path="contact" element={<Contact />} />
					<Route path="products/:menuId" element={<ProductDetails />} />
					<Route path="hoodies" element={<ProductHoodies />} />
					<Route path="shirt" element={<ProductShirt />} />
					<Route path="shoes" element={<ProductShoes />} />
					<Route path="jeans" element={<ProductJeans />} />
					<Route path="cart" element={<AddToCart />} />
				</Route>
			</Routes>
		</>
	);
};

export default AppRoutes;
