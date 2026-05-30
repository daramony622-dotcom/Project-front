import { useNavigate } from "react-router-dom";
import { useCart } from "../../hook/contextCart";
import { hoodies } from "../../data/hoodies";

const ProductHoodies = () => {
	const navigate = useNavigate();
	const { cart, addToCart } = useCart();

	const getItemKey = (item) =>
		`${String(item.menuId ?? item.id)}-${String(item.size ?? "default")}`;

	const defaultSize = "M";

	return (
		<div className="w-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 reveal-on-scroll">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12 reveal-on-scroll">
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
						Hoodies Collection
					</h2>
					<p className="text-slate-600 text-sm sm:text-base">
						Comfortable and stylish hoodies for every occasion
					</p>
				</div>

				{/* Hoodie cards grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
					{hoodies.map((h) => {
						const product = {
							...h,
							category: "Hoodies",
							menuId: `hoodies-${h.id}`,
						};
						const itemKey = getItemKey({ ...product, size: defaultSize });
						const isAdded = cart.some((item) => getItemKey(item) === itemKey);

						return (
							<div
								key={product.menuId}
								onClick={() => navigate(`/products/${product.menuId}`)}
								className="reveal-on-scroll group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100">
								<div className="relative overflow-hidden bg-slate-200 h-56 sm:h-60">
									<img
										src={product.img}
										alt={product.name}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
									/>
								</div>
								<div className="p-4 sm:p-6">
									<h3 className="text-lg sm:text-xl font-semibold text-slate-900">
										{product.name}
									</h3>
									<p className="text-slate-600 text-sm sm:text-base mt-2 line-clamp-2">
										{product.description}
									</p>
									<div className="flex items-center justify-between mt-4">
										<p className="text-lg sm:text-xl font-bold text-slate-900">
											${product.price.toFixed(2)}
										</p>
										<span className="text-xs sm:text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
											In Stock
										</span>
									</div>
									<button
										type="button"
										onClick={(event) => {
											event.stopPropagation();
											if (!isAdded) {
												addToCart(product, 1, defaultSize);
											}
										}}
										disabled={isAdded}
										className={`w-full mt-6 py-2.5 sm:py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 transform active:scale-95 ${
											isAdded
												? "bg-slate-400 text-slate-200 cursor-not-allowed"
												: "bg-slate-900 text-white hover:bg-slate-700"
										}`}>
										{isAdded ? "Added" : "Add to Cart"}
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ProductHoodies;
