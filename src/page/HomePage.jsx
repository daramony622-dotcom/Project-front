import { useNavigate } from "react-router-dom";
import { useCart } from "../hook/contextCart";
import { Product } from "../data/products";
import Banner from "../components/Banner";
const HomePage = () => {
	const navigate = useNavigate();
	const { cart, addToCart } = useCart();

	const getItemKey = (item) =>
		`${String(item.menuId ?? item.id)}-${String(item.size ?? "default")}`;

	const getDefaultSize = (category) => (category === "Shoes" ? "8" : "M");

	return (
		<>
			<div className="reveal-on-scroll">
				<Banner />
			</div>

			<section className="w-full py-8 sm:py-12 reveal-on-scroll">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="mb-6 sm:mb-7">
						<h2 className="text-2xl text-center sm:text-3xl font-bold text-slate-800">
							Featured{" "}
							<span className="text-blue-600 m-1 p-1 rounded-lg bg-blue-50 items-center justify-center inline-flex">
								Products
							</span> 
						</h2>
						<p className="mt-1 text-center text-sm text-slate-700 sm:text-base">
							Shop top picks with a layout that fits every screen.
						</p>
					</div>

					<div className="reveal-on-scroll grid grid-cols-1 gap-6 pb-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{Product.map((ele) => {
							const defaultSize = getDefaultSize(ele.category);
							const itemKey = getItemKey({ ...ele, size: defaultSize });
							const isAdded = cart.some((item) => getItemKey(item) === itemKey);
							const addButtonClass = isAdded
								? "mt-4 w-full rounded-xl border py-2.5 text-sm font-semibold transition-all duration-300 border-slate-300 bg-slate-400 text-slate-200 cursor-not-allowed"
								: "mt-4 w-full rounded-xl border border-slate-900 bg-slate-900 py-2.5 text-sm font-semibold text-slate-100 transition-all duration-300 hover:border-slate-700 hover:bg-slate-700 active:bg-slate-800";

							return (
								<article
									key={ele.menuId}
									onClick={() => navigate(`/products/${ele.menuId}`)}
									className="reveal-on-scroll group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_14px_34px_-20px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.65)] cursor-pointer">
									<div className="relative overflow-hidden bg-slate-900">
										<img
											src={ele.img}
											alt={ele.name}
											className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-64"
										/>
										<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900/55 via-slate-900/5 to-transparent" />

										<p className="absolute left-3 top-3 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-semibold text-white shadow-md sm:text-sm">
											${Number(ele.price).toFixed(2)}
										</p>
										<p className="absolute right-3 top-3 rounded-full bg-emerald-500/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
											In Stock
										</p>
									</div>

									<div className="flex flex-1 flex-col p-4 sm:p-5">
										<p className="text-base font-semibold leading-6 text-slate-900 sm:text-lg">
											{ele.name}
										</p>
										<p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
											{ele.description}
										</p>

										<div className="mt-4 flex items-center justify-between">
											<span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
												Fast Shipping
											</span>
											<span className="text-sm font-semibold text-slate-900">
												Ready to order
											</span>
										</div>

										<button
											type="button"
											onClick={(event) => {
												event.stopPropagation();
												if (!isAdded) {
													addToCart(ele, 1, defaultSize);
												}
											}}
											disabled={isAdded}
											className={addButtonClass}>
											{isAdded ? "Added" : "Add To Cart"}
										</button>
									</div>
								</article>
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
};

export default HomePage;
