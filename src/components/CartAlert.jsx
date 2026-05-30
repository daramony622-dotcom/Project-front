import { useEffect } from "react";
import { useCart } from "../hook/contextCart";

const CartAlert = () => {
	const { cartAlert, clearCartAlert } = useCart();

	useEffect(() => {
		if (!cartAlert) return;

		const timerId = window.setTimeout(() => {
			clearCartAlert();
		}, 2400);

		return () => window.clearTimeout(timerId);
	}, [cartAlert, clearCartAlert]);

	if (!cartAlert) return null;

	return (
		<div
			role="status"
			aria-live="polite"
			className="pointer-events-none fixed left-1/2 top-20 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 sm:left-auto sm:right-4 sm:top-24 sm:w-full sm:translate-x-0">
			<div className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30">
				{cartAlert.message}
			</div>
		</div>
	);
};

export default CartAlert;
