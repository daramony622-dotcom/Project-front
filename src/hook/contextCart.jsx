import {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	createContext,
} from "react";
const CartContext = createContext(null);
const getItemKey = (product) =>
	`${String(product.menuId ?? product.id)}-${String(product.size ?? "default")}`;

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [cartAlert, setCartAlert] = useState(null);
	const pendingAlertLabel = useRef("");

	const addToCart = useCallback((product, quantity = 1, size) => {
		if (!product || quantity <= 0) return;

		const itemSize = size || product.size;
		const key = getItemKey({ ...product, size: itemSize });

		setCart((prevCart) => {
			const existingItem = prevCart.find((item) => getItemKey(item) === key);

			if (existingItem) {
				return prevCart;
			}

			pendingAlertLabel.current = product.name || "Product";
			return [...prevCart, { ...product, quantity, size: itemSize }];
		});
	}, []);

	useEffect(() => {
		if (!pendingAlertLabel.current) return;

		setCartAlert({
			id: Date.now(),
			message: `${pendingAlertLabel.current} added to cart.`,
		});
		pendingAlertLabel.current = "";
	}, [cart]);

	const clearCartAlert = useCallback(() => {
		setCartAlert(null);
	}, []);

	const updateQuantity = (itemKey, delta) => {
		setCart((prevCart) =>
			prevCart.map((item) => {
				if (getItemKey(item) !== String(itemKey)) return item;

				const currentQuantity = item.quantity || 1;
				const nextQuantity = currentQuantity + delta;
				return {
					...item,
					quantity: nextQuantity < 1 ? 1 : nextQuantity,
				};
			}),
		);
	};

	const removeFromCart = (itemKey) => {
		setCart((prevCart) =>
			prevCart.filter((item) => getItemKey(item) !== String(itemKey)),
		);
	};

	const clearCart = () => setCart([]);
	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				updateQuantity,
				removeFromCart,
				clearCart,
				cartAlert,
				clearCartAlert,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export const Carts = CartProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error("useCart must be used inside CartProvider");
	}

	return context;
};
