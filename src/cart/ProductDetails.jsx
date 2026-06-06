import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Allproducts } from "../data/AllProducts";
import { useCart } from "../hook/contextCart";

const ProductDetails = () => {
	const navigate = useNavigate();
	const { menuId } = useParams();
	const { addToCart, cart } = useCart();
	const product = Allproducts.find((item) => item.menuId === menuId);
	const [quantity, setQuantity] = useState(1);
	const [selectedSize, setSelectedSize] = useState(() =>
		product?.category === "Shoes" ? "8" : "M",
	);

	const getItemKey = (productItem) =>
		`${String(productItem.menuId ?? productItem.id)}-${String(
			productItem.size ?? "default",
		)}`;

	const selectedItemKey = product
		? getItemKey({ ...product, size: selectedSize })
		: null;
	const isAdded = cart.some(
		(item) => selectedItemKey && getItemKey(item) === selectedItemKey,
	);

	const sizeOptions = useMemo(() => {
		if (!product) return [];

		if (product.category === "Shoes") {
			return ["6", "7", "8", "9", "10", "11"];
		}

		return ["XS", "S", "M", "L", "XL"];
	}, [product]);

	const relatedProducts = useMemo(() => {
		if (!product) return [];

		return Allproducts.filter(
			(item) => item.category === product.category && item.menuId !== menuId,
		).slice(0, 4);
	}, [menuId, product]);

	const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));
	const increaseQuantity = () => setQuantity((q) => q + 1);

	const handleAddToCart = () => {
		if (!product || isAdded) return;
		addToCart(product, quantity, selectedSize);
	};

	if (!product) {
		return (
			<div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
				<div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
					<h1 className="text-3xl font-bold text-slate-900">
						Product not found
					</h1>
					<p className="mt-3 text-slate-600">
						The item may have moved or is no longer available.
					</p>
					<button
						type="button"
						onClick={() => navigate("/menu")}
						className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700">
						Back to Menu
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-cyan-50/40 px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<button
					type="button"
					onClick={() => navigate(-1)}
					className="mb-6 text-sm font-semibold text-slate-700 transition hover:text-cyan-600">
					← Back
				</button>

				<div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/50 sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-8">
					<div className="overflow-hidden rounded-2xl bg-slate-100">
						<img
							src={product.img}
							alt={product.name}
							className="h-full max-h-[560px] w-full object-cover"
						/>
					</div>

					<div className="flex flex-col">
						<span className="inline-flex w-fit rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
							{product.category}
						</span>

						<h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
							{product.name}
						</h1>

						<p className="mt-3 text-3xl font-black text-slate-900">
							${Number(product.price).toFixed(2)}
						</p>

						<p className="mt-5 text-base leading-relaxed text-slate-600">
							{product.description || "No description available."}
						</p>

						<div className="mt-8 grid gap-6 sm:grid-cols-2">
							<div>
								<p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
									Size
								</p>
								<div className="flex flex-wrap gap-2">
									{sizeOptions.map((size) => (
										<button
											key={size}
											type="button"
											onClick={() => setSelectedSize(size)}
											className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
												selectedSize === size
													? "bg-slate-900 text-white"
													: "bg-slate-100 text-slate-700 hover:bg-slate-200"
											}`}>
											{size}
										</button>
									))}
								</div>
							</div>

							<div>
								<p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
									Quantity
								</p>
								<div className="inline-flex items-center overflow-hidden rounded-xl border border-slate-200">
									<button
										type="button"
										onClick={decreaseQuantity}
										className="px-4 py-2 text-lg font-bold text-slate-700 transition hover:bg-slate-100">
										-
									</button>
									<span className="min-w-14 border-x border-slate-200 px-4 py-2 text-center font-semibold text-slate-900">
										{quantity}
									</span>
									<button
										type="button"
										onClick={increaseQuantity}
										className="px-4 py-2 text-lg font-bold text-slate-700 transition hover:bg-slate-100">
										+
									</button>
								</div>
							</div>
						</div>

						<div className="mt-8 flex flex-wrap items-center gap-3">
							<button
								type="button"
								onClick={handleAddToCart}
								disabled={isAdded}
								className={`rounded-xl px-6 py-3 font-semibold text-white transition ${
									isAdded
										? "bg-slate-400 cursor-not-allowed"
										: "bg-slate-900 hover:bg-slate-700"
								}`}>
								{isAdded ? "Added to Cart" : "Add to Cart"}
							</button>
							<button
								type="button"
								onClick={() => navigate("/cart")}
								className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900">
								View Cart
							</button>
						</div>

						<div className="mt-8 grid gap-3 sm:grid-cols-2">
							<div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
								<p className="text-sm font-semibold text-slate-900">
									Fast Delivery
								</p>
								<p className="text-sm text-slate-600">2-5 business days</p>
							</div>
							<div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
								<p className="text-sm font-semibold text-slate-900">
									30-Day Returns
								</p>
								<p className="text-sm text-slate-600">Hassle-free exchange</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto mt-12 max-w-6xl">
				<h2 className="text-2xl font-bold text-slate-900">You May Also Like</h2>
				{relatedProducts.length === 0 ? (
					<p className="mt-3 text-slate-600">No related products yet.</p>
				) : (
					<div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
						{relatedProducts.map((item) => (
							<button
								key={item.menuId}
								type="button"
								onClick={() => navigate(`/products/${item.menuId}`)}
								className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md">
								<img
									src={item.img}
									alt={item.name}
									className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
								/>
								<div className="p-3">
									<p className="line-clamp-1 font-semibold text-slate-900">
										{item.name}
									</p>
									<p className="mt-1 text-sm font-bold text-slate-700">
										${Number(item.price).toFixed(2)}
									</p>
								</div>
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductDetails;
