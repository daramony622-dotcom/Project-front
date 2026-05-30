const AboutPage = () => {
	return (
		<div className="max-w-7xl mx-auto min-h-screen mt-10 px-4">
			{/* Improved Hero Banner Section */}
			<div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl shadow-slate-300 reveal-on-scroll mb-16">
				{/* Background Image with Overlay */}
				<img
					className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
					src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200" // Switched to a reliable placeholder, replace with yours
					alt="Store Banner"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40 flex flex-col justify-center px-6 md:px-12 text-white">
					<div className="max-w-2xl">
						<h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
							Welcome to <span className="text-blue-400">About</span> Products
						</h2>
						<p className="text-base md:text-xl text-slate-200 leading-relaxed">
							Let you know about us and our products. We are committed to
							providing high-quality products that meet your needs and exceed
							your expectations.
						</p>
					</div>
				</div>
			</div>

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
