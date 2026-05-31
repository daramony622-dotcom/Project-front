import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoCart } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { FiArrowUp } from "react-icons/fi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import logoshop from "../assets/images/logoshop.png";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../hook/contextCart";
import { useDarkMode } from "../hook/useDarkMode";

const Navbar = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const { user, isAuthenticated, logout } = useAuth();
	const { cart } = useCart();
	const { isDark, toggleDarkMode } = useDarkMode();
	const navigate = useNavigate();

	const totalQuantity = cart.reduce(
		(sum, item) => sum + (Number(item.quantity) || 1),
		0,
	);

	const toggleMobile = () => setMobileOpen((s) => !s);
	const closeMobile = () => setMobileOpen(false);

	const handleLogout = () => {
		logout();
		closeMobile();
		navigate("/login", { replace: true });
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setShowScrollTop(true);
			} else {
				setShowScrollTop(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (!mobileOpen) {
			document.body.style.overflow = "";
			return;
		}

		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	const mobileCircleItems = [
		{ to: "/jeans", label: "Jeans", x: 36, y: 16 },
		{ to: "/register", label: "Register", x: 64, y: 18 },
		{ to: "/hoodies", label: "Hoodies", x: 23, y: 34 },
		{ to: "/cart", label: "Cart", x: 77, y: 34 },
		{ to: "/shoes", label: "Shoes", x: 17, y: 50 },
		{ to: "/", label: "Home", x: 83, y: 50 },
		{ to: "/shirt", label: "T-Shirt", x: 25, y: 66 },
		{ to: "/about", label: "About", x: 75, y: 66 },
		{ to: "/contact", label: "Contact", x: 38, y: 81 },
		{ to: "/menu", label: "Menu", x: 62, y: 81 },
	];

	return (
		<nav className="w-full bg-linear-to-r rounded-b-2xl from-slate-700 to-slate-500 shadow-xl sticky top-0 z-50">
			<div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-2 md:px-6 md:py-4 sm:px-5">
				{/* Logo Section */}
				<div className="flex items-center gap-2 sm:gap-3">
					<Link to="/" className="flex items-center gap-2 sm:gap-3">
						<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-cyan-400 to-blue-500 p-0.5 shadow-md md:h-14 md:w-14 lg:h-16 lg:w-16">
							<img
								className="h-full w-full object-cover rounded-full"
								src={logoshop}
								alt="Shop Logo"
							/>
						</div>
						<span className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white font-heading font-extrabold hover:text-cyan-300 transition-colors duration-500">
							Meng's Shop
						</span>
					</Link>
				</div>

				{/* --- DESKTOP NAVIGATION --- */}
				<div className="hidden flex-1 items-center justify-center lg:flex">
					{/* Products Dropdown */}
					<div className="relative mx-2">
						<div className="group">
							<button className="inline-flex items-center rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-300 hover:text-slate-900 md:px-5 md:py-2.5">
								Products
								<svg
									className="ml-2 h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor">
									<path
										fillRule="evenodd"
										d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
										clipRule="evenodd"
									/>
								</svg>
							</button>

							{/* Dropdown Box */}
							<div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 transform-gpu opacity-0 scale-95 transition-all duration-150 group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto">
								<div className="bg-white rounded-lg shadow-lg overflow-hidden mt-2">
									<ul className="divide-y divide-slate-100">
										<li>
											<NavLink
												to="/hoodies"
												className={({ isActive }) =>
													`block px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-cyan-500 text-white" : "text-slate-700 hover:bg-slate-50"}`
												}>
												Hoodies
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/shirt"
												className={({ isActive }) =>
													`block px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-cyan-500 text-white" : "text-slate-700 hover:bg-slate-50"}`
												}>
												T-Shirt
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/shoes"
												className={({ isActive }) =>
													`block px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-cyan-500 text-white" : "text-slate-700 hover:bg-slate-50"}`
												}>
												Shoes
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/jeans"
												className={({ isActive }) =>
													`block px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-cyan-500 text-white" : "text-slate-700 hover:bg-slate-50"}`
												}>
												Jeans
											</NavLink>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* Regular Links */}
					<ul className="flex flex-wrap items-center justify-center gap-2 md:gap-3 lg:gap-4">
						<li>
							<NavLink
								to="/"
								className={({ isActive }) =>
									`block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
										isActive
											? "bg-slate-50 text-slate-900 shadow-md"
											: "text-white hover:bg-slate-600"
									}`
								}>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/about"
								className={({ isActive }) =>
									`block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
										isActive
											? "bg-slate-50 text-slate-900 shadow-md"
											: "text-white hover:bg-slate-600"
									}`
								}>
								About
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/menu"
								className={({ isActive }) =>
									`block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
										isActive
											? "bg-slate-50 text-slate-900 shadow-md"
											: "text-white hover:bg-slate-600"
									}`
								}>
								Menu
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/contact"
								className={({ isActive }) =>
									`block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
										isActive
											? "bg-slate-50 text-slate-900 shadow-md"
											: "text-white hover:bg-slate-600"
									}`
								}>
								Contact
							</NavLink>
						</li>
					</ul>
				</div>

				{/* Desktop Action Buttons */}
				<div className="hidden items-center justify-end gap-3 lg:flex">
					{" "}
					{/* Dark Mode Toggle */}
					<button
						onClick={toggleDarkMode}
						className="rounded-lg bg-slate-600 px-4 py-2 text-white transition-all duration-300 hover:bg-slate-500 flex items-center gap-2"
						aria-label="Toggle dark mode">
						{isDark ? (
							<MdLightMode className="text-xl" />
						) : (
							<MdDarkMode className="text-xl" />
						)}
					</button>{" "}
					{isAuthenticated ? (
						<div className="flex items-center gap-3">
							<span className="rounded-lg bg-slate-600 px-3 py-2 text-sm font-medium text-white">
								{user?.username}
							</span>
							<button
								type="button"
								onClick={handleLogout}
								className="rounded-lg flex items-center gap-2 bg-red-600 px-4 py-2 font-semibold text-white transition-all hover:bg-red-700 md:px-5 md:py-2">
								<span>Logout</span>
								<FiLogOut className="text-lg" />
							</button>
						</div>
					) : (
						<Link
							to="/login"
							onClick={closeMobile}
							className="rounded-lg flex items-center gap-2 bg-cyan-600 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-slate-400 md:px-5 md:py-2">
							<span>Login</span>
							<LuLogIn className="text-lg" />
						</Link>
					)}
					<Link
						to="/cart"
						onClick={closeMobile}
						className="relative rounded-lg bg-green-600 px-4 py-2 flex items-center gap-2 font-semibold text-white transition-all duration-300 hover:bg-green-500 md:px-5 md:py-2">
						<span>Cart</span>
						<IoCart className="text-xl" />
						{totalQuantity > 0 && (
							<span className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
								{totalQuantity}
							</span>
						)}
					</Link>
				</div>

				{/* --- TABLET / MOBILE RESPONSIVE CIRCLE BUTTON --- */}
				<div className="lg:hidden flex items-center gap-2 z-50">
					{/* Dark Mode Toggle - Mobile */}
					<button
						onClick={toggleDarkMode}
						className="w-12 h-12 flex items-center justify-center bg-slate-600 rounded-lg shadow-md transition-all duration-300 active:scale-90 hover:bg-slate-500"
						aria-label="Toggle dark mode">
						{isDark ? (
							<MdLightMode className="text-white text-2xl" />
						) : (
							<MdDarkMode className="text-white text-2xl" />
						)}
					</button>
					<button
						onClick={toggleMobile}
						aria-label="Toggle menu"
						className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-cyan-500 rounded-lg focus:outline-none shadow-md transition-all duration-300 active:scale-90 hover:bg-cyan-600">
						{/* Animated Hamburger lines turning into an 'X' */}
						<span
							className={`h-0.5 w-5 bg-white rounded transition-transform duration-300 ease-in-out ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
						/>
						<span
							className={`h-0.5 w-5 bg-white rounded transition-opacity duration-300 ease-in-out ${mobileOpen ? "opacity-0" : ""}`}
						/>
						<span
							className={`h-0.5 w-5 bg-white rounded transition-transform duration-300 ease-in-out ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
						/>
					</button>
				</div>
			</div>

			{/* --- TABLET / MOBILE CENTERED CIRCLE MENU --- */}
			<div
				className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
					mobileOpen
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0"
				}`}>
				<div
					className="absolute inset-0 bg-black/45 backdrop-blur-[3px]"
					onClick={closeMobile}
				/>
				<div className="absolute inset-0 flex items-center justify-center px-3 pt-24 pb-8 sm:px-4">
					<div
						className={`relative h-[92vw] w-[92vw] min-h-[320px] min-w-[320px] max-h-[390px] max-w-[390px] rounded-full bg-slate-50/98 shadow-[0_28px_55px_rgba(15,23,42,0.35)] transition-all duration-300 sm:h-[84vw] sm:w-[84vw] ${
							mobileOpen ? "scale-100" : "scale-90"
						}`}
						onClick={(event) => event.stopPropagation()}>
						<div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
							{isAuthenticated ? (
								<button
									onClick={handleLogout}
									className="flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-red-700">
									<span>Logout</span>
									<FiLogOut />
								</button>
							) : (
								<Link
									to="/login"
									onClick={closeMobile}
									className="flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-cyan-500">
									<span>Login</span>
									<LuLogIn className="text-base" />
								</Link>
							)}
							<button
								onClick={toggleDarkMode}
								className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-slate-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-slate-500">
								{isDark ? (
									<MdLightMode className="text-lg" />
								) : (
									<MdDarkMode className="text-lg" />
								)}
							</button>
						</div>
						{mobileCircleItems.map((item, index) => {
							const isCartLink = item.to === "/cart";
							const style = {
								left: `${item.x}%`,
								top: `${item.y}%`,
								transitionDelay: `${index * 38}ms`,
							};
							return (
								<NavLink
									key={item.to}
									to={item.to}
									onClick={closeMobile}
									style={style}
									className={({ isActive }) =>
										`absolute z-20 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-[10px] px-3 py-2 text-[0.86rem] font-semibold whitespace-nowrap shadow-sm transition-all duration-200 sm:px-3.5 sm:text-[0.92rem] ${
											isActive
												? "bg-cyan-500 text-white shadow-md scale-105"
												: "bg-slate-200 text-slate-700 hover:bg-cyan-400 hover:text-white hover:scale-105"
										}`
									}>
									<span>{item.label}</span>
									{isCartLink && totalQuantity > 0 && (
										<span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
											{totalQuantity}
										</span>
									)}
								</NavLink>
							);
						})}
					</div>
				</div>
			</div>

			{/* Scroll to Top Button - Mobile Responsive */}
			{showScrollTop && !mobileOpen && (
				<button
					onClick={scrollToTop}
					aria-label="Scroll to top"
					className="fixed bottom-6 right-6 z-40 lg:hidden w-14 h-14 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center hover:shadow-xl">
					<FiArrowUp className="text-2xl" />
				</button>
			)}
		</nav>
	);
};

export default Navbar;
