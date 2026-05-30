import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaShieldAlt, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Back from "../assets/images/Back.png";

const fieldClass =
	"w-full rounded-md border border-[#4f5a8a] bg-[#343c63] py-3 pl-11 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30";

const LoginPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { isAuthenticated, login, register } = useAuth();

	const isRegister = location.pathname === "/register";
	const requestedPath = location.state?.from?.pathname || "/";
	const redirectTo =
		requestedPath === "/login" || requestedPath === "/register"
			? "/"
			: requestedPath;

	const [message, setMessage] = useState({ type: "", text: "" });
	const [loginForm, setLoginForm] = useState({
		usernameOrEmail: "",
		password: "",
	});
	const [registerForm, setRegisterForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	useEffect(() => {
		if (isAuthenticated) {
			navigate(redirectTo, { replace: true });
		}
	}, [isAuthenticated, navigate, redirectTo]);

	const handleLoginSubmit = (event) => {
		event.preventDefault();
		setMessage({ type: "", text: "" });

		if (!loginForm.usernameOrEmail.trim() || !loginForm.password.trim()) {
			setMessage({ type: "error", text: "Please fill all login fields." });
			return;
		}
		const result = login(loginForm);
		if (!result.ok) {
			setMessage({ type: "error", text: result.message });
			return;
		}

		setMessage({ type: "success", text: result.message });
		navigate(redirectTo, { replace: true });
	};

	const handleRegisterSubmit = (event) => {
		event.preventDefault();
		setMessage({ type: "", text: "" });

		if (
			!registerForm.username.trim() ||
			!registerForm.email.trim() ||
			!registerForm.password.trim()
		) {
			setMessage({ type: "error", text: "Please fill all register fields." });
			return;
		}
		if (registerForm.password.length < 6) {
			setMessage({
				type: "error",
				text: "Password must be at least 6 characters.",
			});
			return;
		}

		const result = register(registerForm);
		if (!result.ok) {
			setMessage({ type: "error", text: result.message });
			return;
		}

		setMessage({ type: "success", text: result.message });
		navigate(redirectTo, { replace: true });
	};

	return (
		<div className="relative min-h-screen overflow-hidden bg-[#131936] font-sans text-white">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
				<div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
			</div>

			<div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1160px] items-center justify-center p-4 md:p-8">
				<div className="relative w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#1f2542]/95 shadow-[0_30px_70px_rgba(7,11,34,0.55)] md:h-[620px]">
					<div className="border-b border-white/10 bg-gradient-to-r from-[#e6eaff] to-[#2a3372] px-6 py-8 text-center md:hidden">
						<h2 className="text-2xl font-bold">
							{isRegister ? "Create Account" : "Welcome Back"}
						</h2>
						<p className="mt-2 text-sm text-cyan-100/90">
							{isRegister
								? "Join the platform and start tracking your style."
								: "Sign in to continue shopping with your account."}
						</p>
						<Link
							to={isRegister ? "/login" : "/register"}
							className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-cyan-400 px-6 text-sm font-semibold text-[#0a2a49] shadow-[0_10px_24px_rgba(29,190,255,0.35)] transition hover:bg-cyan-300">
							{isRegister ? "Sign In" : "Sign Up"}
						</Link>
					</div>

					<div
						className={`pointer-events-none absolute left-0 top-0 hidden h-full w-1/2 overflow-hidden md:block md:transition-transform md:duration-700 md:ease-in-out ${
							isRegister ? "md:translate-x-full" : "md:translate-x-0"
						}`}>
						<div className="absolute inset-0 bg-[linear-gradient(145deg,#2f3f9e_0%,#26337a_56%,#202651_100%)]" />
						<div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.24),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(72,249,255,0.28),transparent_38%)]" />

						<div className="relative z-10 flex h-full flex-col p-10">
							<div className="flex items-center gap-2 text-cyan-300">
								<span className="text-lg font-semibold tracking-wide">
									ShopSecure
								</span>
							</div>

							<div className="relative mt-10 flex-1">
								<div
									className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ${
										isRegister
											? "translate-x-10 opacity-0"
											: "translate-x-0 opacity-100"
									}`}>
									<h2 className="max-w-[330px] text-[2.1rem] font-bold leading-tight">
										Hello! Welcome Back
									</h2>
									<p className="mt-4 max-w-[320px] text-sm text-cyan-100/85">
										Don&apos;t have an account yet? Create one and unlock your
										favorite products.
									</p>
									<Link
										to="/register"
										className="pointer-events-auto mt-8 inline-flex h-12 items-center justify-center rounded-md border border-cyan-200/80 px-12 text-base font-semibold text-cyan-50 transition hover:bg-cyan-200/15">
										Sign Up
									</Link>
								</div>

								<div
									className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ${
										isRegister
											? "translate-x-0 opacity-100"
											: "-translate-x-10 opacity-0"
									}`}>
									<h2 className="max-w-[330px] text-[2.1rem] font-bold leading-tight">
										Great To See You Again
									</h2>
									<p className="mt-4 max-w-[320px] text-sm text-cyan-100/85">
										Already have an account? Sign in and continue right where
										you left off.
									</p>
									<Link
										to="/login"
										className="pointer-events-auto mt-8 inline-flex h-12 items-center justify-center rounded-md border border-cyan-200/80 px-12 text-base font-semibold text-cyan-50 transition hover:bg-cyan-200/15">
										Sign In
									</Link>
								</div>
							</div>

							<div className="relative mt-auto h-48">
								<div className="absolute bottom-8 left-0 h-5 w-16 rounded-full bg-cyan-100/70" />
								<div className="absolute bottom-20 right-16 h-6 w-20 rounded-full bg-cyan-100/65" />
								<div className="absolute bottom-0 left-8 h-28 w-[280px] rounded-xl border border-cyan-200/30 bg-[#1b244b]/75 shadow-[0_18px_34px_rgba(11,18,52,0.45)]" />
								<div className="absolute bottom-7 left-12 h-4 w-40 rounded bg-cyan-300/35" />
								<div className="absolute bottom-14 left-12 h-4 w-52 rounded bg-cyan-300/30" />
								<div className="absolute bottom-21 left-12 h-4 w-28 rounded bg-cyan-300/35" />
								<div className="absolute bottom-1 right-6 h-12 w-12 rounded-xl border border-cyan-300/30 bg-cyan-300/20" />
							</div>
						</div>
					</div>

					<div
						className={`relative z-20 w-full bg-[#2a304f]/95 p-6 sm:p-8 md:absolute md:right-0 md:top-0 md:h-full md:w-1/2 md:p-12 md:transition-transform md:duration-700 md:ease-in-out ${
							isRegister ? "md:-translate-x-full" : "md:translate-x-0"
						}`}>
						<div className="relative md:h-full">
							<form
								onSubmit={handleLoginSubmit}
								className={`w-full md:absolute md:inset-0 md:flex md:flex-col md:justify-center md:transition-all md:duration-500 md:ease-in-out ${
									isRegister
										? "hidden md:pointer-events-none md:flex md:-translate-x-8 md:opacity-0"
										: "block md:pointer-events-auto md:translate-x-0 md:opacity-100"
								}`}>
								<h1 className="text-3xl font-bold">Sign In</h1>
								<p className="mt-2 text-sm text-slate-300">
									Use your username or email to access your account.
								</p>

								{message.text && !isRegister && (
									<p
										className={`mt-5 rounded-md border px-3 py-2 text-sm ${
											message.type === "error"
												? "border-red-400/35 bg-red-500/15 text-red-100"
												: "border-emerald-400/35 bg-emerald-500/15 text-emerald-100"
										}`}>
										{message.text}
									</p>
								)}

								<div className="mt-7 space-y-4">
									<div className="relative">
										<FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
										<input
											type="text"
											value={loginForm.usernameOrEmail}
											onChange={(event) =>
												setLoginForm((previous) => ({
													...previous,
													usernameOrEmail: event.target.value,
												}))
											}
											placeholder="Username or Email"
											className={fieldClass}
										/>
									</div>

									<div className="relative">
										<FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
										<input
											type="password"
											value={loginForm.password}
											onChange={(event) =>
												setLoginForm((previous) => ({
													...previous,
													password: event.target.value,
												}))
											}
											placeholder="Password"
											className={fieldClass}
										/>
									</div>
								</div>

								<div className="mt-4 text-right">
									<button
										type="button"
										className="text-sm text-cyan-300 transition hover:text-cyan-200">
										Forgot password?
									</button>
								</div>

								<button
									type="submit"
									className="mt-6 w-full rounded-md bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-3 text-sm font-semibold text-[#06213d] shadow-[0_10px_24px_rgba(29,190,255,0.35)] transition hover:brightness-110">
									Sign In
								</button>

								<p className="mt-5 text-sm text-slate-300 md:hidden">
									Don&apos;t have an account?{" "}
									<Link to="/register" className="font-semibold text-cyan-300">
										Sign Up
									</Link>
								</p>
							</form>

							<form
								onSubmit={handleRegisterSubmit}
								className={`w-full md:absolute md:inset-0 md:flex md:flex-col md:justify-center md:transition-all md:duration-500 md:ease-in-out ${
									isRegister
										? "block md:pointer-events-auto md:translate-x-0 md:opacity-100"
										: "hidden md:pointer-events-none md:flex md:translate-x-8 md:opacity-0"
								}`}>
								<h1 className="text-3xl font-bold">Sign Up</h1>
								<p className="mt-2 text-sm text-slate-300">
									Create your account and start browsing faster.
								</p>

								{message.text && isRegister && (
									<p
										className={`mt-5 rounded-md border px-3 py-2 text-sm ${
											message.type === "error"
												? "border-red-400/35 bg-red-500/15 text-red-100"
												: "border-emerald-400/35 bg-emerald-500/15 text-emerald-100"
										}`}>
										{message.text}
									</p>
								)}

								<div className="mt-7 space-y-4">
									<div className="relative">
										<FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
										<input
											type="text"
											value={registerForm.username}
											onChange={(event) =>
												setRegisterForm((previous) => ({
													...previous,
													username: event.target.value,
												}))
											}
											placeholder="Username"
											className={fieldClass}
										/>
									</div>

									<div className="relative">
										<FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
										<input
											type="email"
											value={registerForm.email}
											onChange={(event) =>
												setRegisterForm((previous) => ({
													...previous,
													email: event.target.value,
												}))
											}
											placeholder="Email"
											className={fieldClass}
										/>
									</div>

									<div className="relative">
										<FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
										<input
											type="password"
											value={registerForm.password}
											onChange={(event) =>
												setRegisterForm((previous) => ({
													...previous,
													password: event.target.value,
												}))
											}
											placeholder="Password (minimum 6 characters)"
											className={fieldClass}
										/>
									</div>
								</div>

								<button
									type="submit"
									className="mt-7 w-full rounded-md bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-3 text-sm font-semibold text-[#06213d] shadow-[0_10px_24px_rgba(29,190,255,0.35)] transition hover:brightness-110">
									Sign Up
								</button>

								<p className="mt-5 text-sm text-slate-300 md:hidden">
									Already have an account?{" "}
									<Link to="/login" className="font-semibold text-cyan-300">
										Sign In
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
