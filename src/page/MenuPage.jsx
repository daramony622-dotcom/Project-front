import { Allproducts } from "../data/AllProducts";
import { useNavigate } from "react-router-dom";

const MenuPage = () => {
	const navigate = useNavigate();

	return (
		<section className="min-h-screen bg-slate-50 py-10">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-8 rounded-3xl bg-white p-8 shadow-xl reveal-on-scroll">
					<h1 className="text-3xl font-bold font-sans text-slate-900 sm:text-4xl text-center">
						All{" "}
						<span className="text-blue-600 m-1 p-1 rounded-lg bg-blue-50 items-center justify-center inline-flex">
							Products
						</span>
					</h1>
					<p className="mt-3 text-slate-700 text-center sm:text-base">
						Explore everything in one place — hoodies, shirts, shoes, and jeans.
					</p>
				</div>

				{Allproducts.length === 0 ? (
					<div className="rounded-3xl bg-white p-8 text-center text-slate-600 shadow-sm">
						<p>No products are available right now. Please check back later.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						{Allproducts.map((product) => (
							<button
								type="button"
								key={product.menuId}
								onClick={() => navigate(`/products/${product.menuId}`)}
								className="reveal-on-scroll overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md focus:outline-none">
								<div className="relative overflow-hidden bg-slate-200 h-56 sm:h-64">
									<img
										src={product.img}
										alt={product.name}
										className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								</div>
								<div className="p-5">
									<p className="text-xs uppercase tracking-wide text-slate-500">
										{product.category}
									</p>
									<h2 className="mt-3 text-lg font-semibold text-slate-900">
										{product.name}
									</h2>
									<p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
										{product.description}
									</p>
									<div className="mt-4 flex items-center justify-between">
										<span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
											In Stock
										</span>
										<p className="text-lg font-bold text-slate-900">
											${Number(product.price).toFixed(2)}
										</p>
									</div>
								</div>
							</button>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default MenuPage;
