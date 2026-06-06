import { useState } from "react";
import { sendContactMessage } from "../api/Api";
import Owner from "../assets/images/Owner.png";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [isSending, setIsSending] = useState(false);
	const [status, setStatus] = useState({ type: "", text: "" });

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const openMailFallback = ({ name, email, subject, message }) => {
		const recipient = "mengsiek8@gmail.com";
		const mailBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
		const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
		window.location.href = mailtoUrl;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus({ type: "", text: "" });
		setIsSending(true);

		const payload = {
			name: formData.name.trim(),
			email: formData.email.trim(),
			subject: formData.subject.trim(),
			message: formData.message.trim(),
		};

		const result = await sendContactMessage(payload);

		if (result.ok) {
			setStatus({
				type: "success",
				text: "Your message has been sent successfully.",
			});
			setFormData({ name: "", email: "", subject: "", message: "" });
			setIsSending(false);
			return;
		}

		if (result.fallback) {
			openMailFallback(payload);
			setStatus({
				type: "success",
				text: "Opened your email app to send the message.",
			});
			setIsSending(false);
			return;
		}

		setStatus({
			type: "error",
			text: result.error || "Unable to send your message right now.",
		});
		setIsSending(false);
	};

	return (
		<div className="min-h-screen max-w-7xl bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
			<h2 className="text-center font-bold font-sans text-3xl text-slate-800">
				Contact{" "}
				<span className="text-blue-600 mx-1 rounded-lg p-1 bg-blue-100 items-center justify-center inline-flex">
					Us
				</span>
			</h2>
			<div className="max-w-full min-h-screen flex justify-center items-center">
				<div className="max-w-5xl w-full bg-white relative rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
					<div className="md:col-span-5 bg-slate-700 p-8 text-white flex flex-col justify-between">
						<div>
							<div className="mb-8 flex flex-col items-center text-center">
								<img
									src={Owner}
									alt="Owner profile"
									className="h-28 w-28 rounded-full border-4 border-white/80 object-cover shadow-lg sm:h-32 sm:w-32"
								/>
								<p className="mt-3 text-lg font-semibold text-white">Owner</p>
								<p className="text-sm text-indigo-100">Siekmeng</p>
							</div>

							<h2 className="text-3xl font-bold tracking-tight mb-4">
								Get in touch
							</h2>
							<p className="text-indigo-100 mb-8 leading-relaxed">
								Have a question or want to work together? Drop us a message, and
								we'll get back to you within 24 hours.
							</p>

							<div className="space-y-6">
								<div className="flex items-center space-x-4">
									<span className="text-xl">📍</span>
									<span className="text-indigo-100 text-sm">
										<a
											href="https://maps.google.com/hSRgoOAQgQSScFRIgNnJGig"
											target="_blank"
											rel="noopener noreferrer">
											Location
										</a>
									</span>
								</div>
								<div className="flex items-center space-x-4">
									<span className="text-xl">✉️</span>
									<span className="text-indigo-100 text-sm">
										mengsiek8@gmail.com
									</span>
								</div>
								<div className="flex items-center space-x-4">
									<span className="text-xl">📞</span>
									<span className="text-indigo-100 text-sm">
										+1 (885) 0963063226
									</span>
								</div>
							</div>
						</div>

						<div className="mt-12 md:mt-0">
							{/* Social Links */}
							<div className="pt-6 border-t border-indigo-500 flex space-x-4">
								<a
									href="https://t.me/Arise_the_shadow_software"
									target="_blank"
									rel="noopener noreferrer"
									className="text-indigo-200 hover:text-white transition-colors">
									Telegram
								</a>
								<a
									href="https://github.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-indigo-200 hover:text-white transition-colors">
									GitHub
								</a>
								<a
									href="https://www.facebook.com/share/1D648iwdxX/?mibextid=wwXIfr"
									target="_blank"
									rel="noopener noreferrer"
									className="text-indigo-200 hover:text-white transition-colors">
									Facebook
								</a>
							</div>
						</div>
					</div>

					{/* Column 2: The Contact Form */}
					<form
						onSubmit={handleSubmit}
						className="md:col-span-7 p-8 md:p-12 space-y-6">
						<h3 className="text-2xl font-bold text-slate-800">
							Send us a Message
						</h3>

						{status.text && (
							<p
								role="status"
								className={`rounded-lg px-4 py-3 text-sm font-medium ${
									status.type === "error"
										? "bg-red-100 text-red-700 border border-red-200"
										: "bg-emerald-100 text-emerald-700 border border-emerald-200"
								}`}>
								{status.text}
							</p>
						)}

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-slate-700 mb-1">
									Your Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
									placeholder="John Doe"
								/>
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-slate-700 mb-1">
									Email Address
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
									placeholder="your@example.com"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="subject"
								className="block text-sm font-medium text-slate-700 mb-1">
								Subject
							</label>
							<input
								type="text"
								id="subject"
								name="subject"
								value={formData.subject}
								onChange={handleChange}
								required
								className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
								placeholder="How can we help you?"
							/>
						</div>

						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-slate-700 mb-1">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								rows="4"
								value={formData.message}
								onChange={handleChange}
								required
								className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
								placeholder="Tell us a bit more about your project..."></textarea>
						</div>

						<button
							type="submit"
							disabled={isSending}
							className="w-full bg-slate-800/80 hover:bg-slate-500 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98]">
							<a
								href="https://t.me/Arise_the_shadow_software"
								target="_blank"
								rel="noopener noreferrer">
								{isSending ? "Sending..." : "Send Message"}
							</a>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Contact;
