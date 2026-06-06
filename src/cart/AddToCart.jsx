import { useCart } from "../hook/contextCart";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
	const navigate = useNavigate();
	const { cart = [], updateQuantity, removeFromCart, clearCart } = useCart();
	const getItemKey = (item) =>
		`${String(item.menuId ?? item.id)}-${String(item.size ?? "default")}`;

	const subtotal = cart.reduce(
		(acc, item) => acc + item.price * (item.quantity || 1),
		0,
	);
	const shipping = subtotal > 0 ? 15.0 : 0;
	const tax = subtotal * 0.1;
	const total = subtotal + tax;

	const handleCheckout = () => {
		if (cart.length === 0) {
			alert("Your cart is empty. Add products before checkout.");
			return;
		}

		alert("Checkout complete! Thank you for your order.");
		clearCart();
		navigate("/");
	};

	return (
		<div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-4xl text-center font-bold tracking-tight text-slate-800 mb-8">
					Shopping Cart
				</h1>

				{cart.length === 0 ? (
					<div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-16 w-16 mx-auto text-gray-400 mb-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
							/>
						</svg>
						<p className="text-xl text-gray-500 font-medium">
							Your cart is feeling lonely.
						</p>
						<button
							type="button"
							onClick={() => navigate("/menu")}
							className="mt-6 bg-blue-800 text-white font-medium px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200">
							Continue Shopping
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* 1. PRODUCT LIST COMPONENT */}
						<div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
							<ul className="divide-y divide-gray-100">
								{cart.map((item, index) => (
									<li
										key={getItemKey(item) || index}
										className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50 transition duration-150">
										{/* Product Thumbnail Image */}
										<div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200">
											<img
												src={
													item.img ||
													item.image ||
													"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200"
												}
												alt={item.name}
												className="w-full h-full object-cover object-center"
											/>
										</div>

										<div className="flex-1 min-w-0 self-start sm:self-center">
											<h3 className="text-lg font-semibold text-gray-800 truncate">
												{item.name}
											</h3>
											<p className="text-sm text-gray-500 mt-1 capitalize">
												{item.category || "Apparel"}
											</p>
											<p className="text-sm text-gray-500 mt-1">
												Size: {item.size || "Standard"}
											</p>

											{/* Interactive Controls */}
											<div className="flex items-center gap-4 mt-4">
												<div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm">
													<button
														type="button"
														onClick={() => updateQuantity(getItemKey(item), -1)}
														disabled={(item.quantity || 1) <= 1}
														className="px-3 py-1 text-gray-500 font-bold transition duration-150 disabled:text-gray-300 disabled:cursor-not-allowed hover:text-gray-700 hover:bg-gray-50">
														-
													</button>
													<span className="px-3 py-1 text-sm font-medium text-gray-700">
														{item.quantity || 1}
													</span>
													<button
														type="button"
														onClick={() => updateQuantity(getItemKey(item), 1)}
														className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 font-bold">
														+
													</button>
												</div>
												<button
													type="button"
													onClick={() => removeFromCart(getItemKey(item))}
													className="text-sm text-red-500 hover:text-red-700 font-medium transition duration-150">
													Remove
												</button>
											</div>
										</div>

										{/* Pricing Display */}
										<div className="text-right self-end sm:self-center">
											<p className="text-xl font-bold text-gray-900">
												${(item.price * (item.quantity || 1)).toFixed(2)}
											</p>
											{item.quantity > 1 && (
												<p className="text-xs text-gray-400 mt-0.5">
													${item.price.toFixed(2)} each
												</p>
											)}
										</div>
									</li>
								))}
							</ul>
						</div>

						<div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-8">
							<h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
								Order Summary
							</h2>
							<div className="space-y-4">
								<div className="flex justify-between text-sm text-gray-600">
									<span>Subtotal</span>
									<span className="font-semibold text-gray-900">
										${subtotal.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between text-sm text-gray-600">
									<span>Shipping Estimate</span>
									<span className="font-semibold text-gray-900">
										${shipping.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between text-sm text-gray-600">
									<span>Estimated Tax (10%)</span>
									<span className="font-semibold text-gray-900">
										${tax.toFixed(2)}
									</span>
								</div>

								<div className="border-t border-gray-100 pt-4 flex justify-between items-center">
									<span className="text-base font-bold text-gray-900">
										Order Total
									</span>
									<span className="text-2xl font-black text-indigo-600">
										${total.toFixed(2)}
									</span>
								</div>
							</div>

							<button
								type="button"
								onClick={handleCheckout}
								className="w-full mt-6 bg-indigo-600 text-white py-3.5 px-4 rounded-xl font-semibold shadow-md shadow-indigo-100 hover:bg-indigo-700 hover:shadow-none active:scale-[0.98] transition duration-150">
								Proceed to Checkout
							</button>
							<button
								type="button"
								onClick={clearCart}
								className="w-full mt-4 bg-white text-red-600 border border-red-200 py-3.5 px-4 rounded-xl font-semibold hover:bg-red-50 transition duration-150">
								Remove All
							</button>
							<div className="mt-4 text-center">
								<p className="text-xs text-gray-400 flex items-center justify-center gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-3.5 w-3.5 text-emerald-500"
										viewBox="0 0 20 20"
										fill="currentColor">
										<path
											fillRule="evenodd"
											d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
											clipRule="evenodd"
										/>
									</svg>
									Secure SSL Checkout
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AddToCart;
