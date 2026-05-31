import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const fieldClass =
	"w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15";

const panelClass = (isActive) =>
	`absolute inset-x-0 top-0 transition-all duration-500 ease-out ${
		isActive
			? "translate-y-0 opacity-100 delay-150"
			: "pointer-events-none translate-y-5 opacity-0"
	}`;

const messageClass = (type) =>
	`rounded-xl border px-3 py-2 text-sm ${
		type === "error"
			? "border-red-200 bg-red-50 text-red-700"
			: "border-emerald-200 bg-emerald-50 text-emerald-700"
	}`;
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
		<div className="min-h-screen bg-slate-100 px-4 py-10 font-sans text-slate-900 sm:px-6">
			<div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center">
				<div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-300/60 md:grid-cols-[0.9fr_1.1fr]">
					<aside className="hidden bg-slate-900 p-10 text-white md:flex md:flex-col md:justify-between">
						<div>
							<Link
								to="/"
								className="inline-flex text-lg font-bold tracking-wide text-white">
								Meng&apos;s Shop
							</Link>
							<div className="relative mt-20 h-72">
								<div className={panelClass(!isRegister)}>
									<p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
										Welcome back
									</p>
									<h2 className="mt-4 text-4xl font-bold leading-tight text-white">
										Sign in and keep shopping.
									</h2>
									<p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
										Access your account, cart, and favorite clothing picks.
									</p>
								</div>
								<div className={panelClass(isRegister)}>
									<p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
										New account
									</p>
									<h2 className="mt-4 text-4xl font-bold leading-tight text-white">
										Create your shopping account.
									</h2>
									<p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
										Save your details and browse products faster next time.
									</p>
								</div>
							</div>
						</div>
						<Link
							to={isRegister ? "/login" : "/register"}
							className="inline-flex w-fit rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-slate-900">
							{isRegister ? "Already have an account" : "Create account"}
						</Link>
					</aside>

					<div className="p-6 sm:p-8 md:p-12">
						<div className="mx-auto max-w-md">
							<div className="relative mb-8 h-20 text-center md:text-left">
								<div className={panelClass(!isRegister)}>
									<h1 className="text-3xl font-bold text-slate-900">Sign In</h1>
									<p className="mt-2 text-sm text-slate-600">
										Use your username or email to access your account.
									</p>
								</div>
								<div className={panelClass(isRegister)}>
									<h1 className="text-3xl font-bold text-slate-900">Sign Up</h1>
									<p className="mt-2 text-sm text-slate-600">
										Create your account and start browsing faster.
									</p>
								</div>
							</div>

							<div className="relative min-h-[355px] sm:min-h-[370px]">
								<form
									onSubmit={handleLoginSubmit}
									className={panelClass(!isRegister)}>
									{message.text && !isRegister && (
										<p className={messageClass(message.type)}>{message.text}</p>
									)}

									<div className="mt-6 space-y-4">
										<div className="relative">
											<FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
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
												disabled={isRegister}
											/>
										</div>

										<div className="relative">
											<FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
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
												disabled={isRegister}
											/>
										</div>
									</div>

									<div className="mt-4 text-right">
										<button
											type="button"
											className="text-sm font-medium text-cyan-600 transition hover:text-cyan-500">
											Forgot password?
										</button>
									</div>

									<button
										type="submit"
										className="mt-6 w-full rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-500">
										Sign In
									</button>

									<p className="mt-6 text-center text-sm text-slate-600 md:hidden">
										Don&apos;t have an account?{" "}
										<Link
											to="/register"
											className="font-semibold text-cyan-600">
											Sign Up
										</Link>
									</p>
								</form>

								<form
									onSubmit={handleRegisterSubmit}
									className={panelClass(isRegister)}>
									{message.text && isRegister && (
										<p className={messageClass(message.type)}>{message.text}</p>
									)}

									<div className="mt-6 space-y-4">
										<div className="relative">
											<FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
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
												disabled={!isRegister}
											/>
										</div>

										<div className="relative">
											<FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
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
												disabled={!isRegister}
											/>
										</div>

										<div className="relative">
											<FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
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
												disabled={!isRegister}
											/>
										</div>
									</div>

									<button
										type="submit"
										className="mt-7 w-full rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-500">
										Sign Up
									</button>

									<p className="mt-6 text-center text-sm text-slate-600 md:hidden">
										Already have an account?{" "}
										<Link to="/login" className="font-semibold text-cyan-600">
											Sign In
										</Link>
									</p>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
