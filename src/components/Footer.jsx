import { Link } from "react-router-dom";
import { FaFacebookF, FaTelegram, FaGithub } from "react-icons/fa";
import {
	FaCcVisa,
	FaCcMastercard,
	FaCcPaypal,
	FaCcApplePay,
} from "react-icons/fa";
const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="w-full bg-[#1e2736] text-slate-300 font-sans rounded-t-2xl border-t border-slate-800">
			<div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
					<div className="lg:col-span-2 space-y-4">
						<Link to="/" className="flex items-center gap-2">
							<span className="text-2xl font-bold tracking-tight text-white font-heading">
								Shop <span className="text-cyan-400">ShowCase</span>
							</span>
						</Link>
						<p className="text-sm text-slate-400 max-w-xs leading-relaxed">
							Let enjoy the Shipping in our Shop. Discover uniquely crafted,
							high-quality items designed to inspire your lifestyle.
						</p>

						<div className="flex items-center gap-3 pt-2">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noreferrer"
								className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-md">
								<FaFacebookF size={16} />
							</a>

							<a
								href="https://t.me/Arise_the_shadow_software"
								target="_blank"
								rel="noreferrer"
								className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-md">
								<FaTelegram size={18} />
							</a>

							{/* GitHub */}
							<a
								href="https://github.com"
								target="_blank"
								rel="noreferrer"
								className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-md">
								<FaGithub size={18} />
							</a>
						</div>
					</div>
					{/* Col-2 */}
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider text-white">
							Shop Categories
						</h3>
						<ul className="mt-4 space-y-2 text-sm">
							<li>
								<Link
									className="hover:text-cyan-400 transition-colors"
									to="/hoodies">
									Hoodies
								</Link>
							</li>
							<li>
								<Link
									className="hover:text-cyan-400 transition-colors"
									to="/shirt">
									T-Shirts
								</Link>
							</li>
							<li>
								<Link
									className="hover:text-cyan-400 transition-colors"
									to="/shoes">
									Shoes
								</Link>
							</li>
							<li>
								<Link
									className="hover:text-cyan-400 transition-colors"
									to="/jeans">
									Jeans
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider text-white">
							Customer Support
						</h3>
						<ul className="mt-4 space-y-2 text-sm">
							<li>
								<Link
									to="/contact"
									className="hover:text-cyan-400 transition-colors">
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									to="/menu"
									className="hover:text-cyan-400 transition-colors">
									Shipping & Returns
								</Link>
							</li>
							<li>
								<Link
									to="/orders"
									className="hover:text-cyan-400 transition-colors">
									Track Order
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="hover:text-cyan-400 transition-colors">
									FAQs
								</Link>
							</li>
						</ul>
					</div>
					{/* Column 4: Company Details */}
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider text-white">
							Our Shop
						</h3>
						<ul className="mt-4 space-y-2 text-sm">
							<li>
								<Link
									to="/about"
									className="hover:text-cyan-400 transition-colors">
									About Us
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
					{/* Copyright notice */}
					<p className="text-xs text-slate-500 text-center md:text-left">
						&copy; {currentYear} Shop ShowCase. All rights reserved. Powered by
						Meng's Shop.
					</p>

					{/* Payment Badges */}
					<div className="flex items-center gap-4 text-slate-500">
						<span className="text-xs font-medium tracking-wide uppercase">
							Secure Checkout:
						</span>
						<div className="flex items-center gap-2 text-3xl">
							<FaCcVisa
								className="hover:text-white transition-colors duration-200"
								title="Visa"
							/>
							<FaCcMastercard
								className="hover:text-white transition-colors duration-200"
								title="Mastercard"
							/>
							<FaCcPaypal
								className="hover:text-white transition-colors duration-200"
								title="Paypal"
							/>
							<FaCcApplePay
								className="hover:text-white transition-colors duration-200"
								title="Apple Pay"
							/>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
