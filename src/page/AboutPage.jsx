import { PopularProducs } from "../data/popular";
import { useNavigate } from "react-router-dom";
import Clearban from "../assets/images/Clearban.png";

const AboutPage = () => {
	const navigate = useNavigate();

	return (
		<div className="max-w-7xl mx-auto min-h-screen mt-10 px-4">
			<section className="reveal-on-scroll mb-12 overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-300/70">
				<div className="relative h-[280px] w-full sm:h-[380px] lg:h-[470px]">
					<img
						src={Clearban}
						alt="Clothing Collection"
						className="h-full w-full object-cover object-center"
					/>
					<div className="absolute inset-0 bg-linear-to-r from-slate-950/70 via-slate-950/25 to-transparent" />
					<div className="absolute inset-0 flex items-center px-6 text-white sm:px-10 lg:px-16">
						<div className="max-w-xl">
							<p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm sm:text-sm">
								About Meng's Shop
							</p>
							<h1 className="text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
								Clothing Collection
							</h1>
							<p className="mt-4 max-w-md text-sm leading-6 text-slate-100 sm:text-lg sm:leading-8">
								Fresh outfits, soft textures, and everyday style in one shop.
							</p>
							<button
								type="button"
								onClick={() => navigate("/menu")}
								className="mt-6 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-950/20 transition hover:bg-cyan-400 sm:px-6 sm:py-3 sm:text-base">
								Shop Clothing
							</button>
						</div>
					</div>
				</div>
			</section>

			<section className="mb-16">
				<div className="mb-6 text-center reveal-on-scroll">
					<h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
						Popular{" "}
						<span className="inline-flex items-center justify-center rounded-lg bg-blue-50 p-1 text-blue-600">
							Products
						</span>
					</h1>
					<p className="mt-3 text-sm text-slate-700 sm:text-base">
						Customer favorites from our hoodies, jackets, shirts, and shoes.
					</p>
				</div>

				{PopularProducs.length === 0 ? (
					<div className="rounded-3xl bg-white p-8 text-center text-slate-600 shadow-sm">
						<p>No products are available right now. Please check back later.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						{PopularProducs.map((ele) => (
							<button
								type="button"
								key={ele.menuId}
								onClick={() => navigate(`/products/${ele.menuId}`)}
								className="reveal-on-scroll group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md focus:outline-none">
								<div className="relative overflow-hidden bg-slate-200 h-56 sm:h-64">
									<img
										src={ele.img}
										alt={ele.name}
										className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								</div>
								<div className="p-5">
									<p className="text-xs uppercase tracking-wide text-slate-500">
										{ele.category}
									</p>
									<h2 className="mt-3 text-lg font-semibold text-slate-900">
										{ele.name}
									</h2>
									<p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
										{ele.description}
									</p>
									<div className="mt-4 flex items-center justify-between">
										<span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
											In Stock
										</span>
										<p className="text-lg font-bold text-slate-900">
											${Number(ele.price).toFixed(2)}
										</p>
									</div>
								</div>
							</button>
						))}
					</div>
				)}
			</section>

			{/* Cards Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 py-6">
				<div className="shadow-lg shadow-slate-300 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 reveal-on-scroll hover:shadow-xl transition-all duration-300">
					<h3 className="text-slate-700 font-bold text-lg mb-3">
						Quality Products
					</h3>
					<p className="text-slate-600 font-sans text-sm leading-relaxed">
						We provide premium quality products that are carefully selected and
						tested to ensure excellence.
					</p>
				</div>

				<div className="shadow-lg shadow-slate-300 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 reveal-on-scroll hover:shadow-xl transition-all duration-300">
					<h3 className="text-slate-700 font-bold text-lg mb-3">
						Fast Shipping
					</h3>
					<p className="text-slate-600 font-sans text-sm leading-relaxed">
						Quick and reliable delivery to your doorstep. We partner with
						trusted courier services for safety.
					</p>
				</div>

				<div className="shadow-lg shadow-slate-300 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 reveal-on-scroll hover:shadow-xl transition-all duration-300">
					<h3 className="text-slate-700 font-bold text-lg mb-3">
						24/7 Support
					</h3>
					<p className="text-slate-600 font-sans text-sm leading-relaxed">
						Our dedicated support team is always ready to assist you with any
						questions or concerns.
					</p>
				</div>
			</div>

			{/* About Description Section */}
			<div className="mt-16 mb-16 mx-auto max-w-3xl reveal-on-scroll shadow-lg text-justify shadow-slate-300 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6">
				<h3 className="text-2xl text-center font-bold text-slate-800 mb-6">
					Our <span className="text-indigo-600">Mission</span>
				</h3>
				<p className="text-gray-700 text-lg leading-relaxed mb-4">
					At Meng's Shop, we believe in delivering exceptional quality and
					service to every customer. Our mission is to provide stylish,
					comfortable, and affordable products that help you express your unique
					style.
				</p>
				<p className="text-gray-700 text-lg leading-relaxed">
					With years of experience in the fashion industry, we understand what
					our customers want and strive to exceed expectations with every
					purchase.
				</p>
			</div>
		</div>
	);
};

export default AboutPage;
