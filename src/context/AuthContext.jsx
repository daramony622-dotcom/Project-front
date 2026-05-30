import { createContext, useContext, useEffect, useMemo, useState } from "react";

const USERS_STORAGE_KEY = "shop_users";
const SESSION_STORAGE_KEY = "shop_current_user";

const AuthContext = createContext(null);

const safeParse = (value, fallback) => {
	try {
		return JSON.parse(value);
	} catch {
		return fallback;
	}
};
const readUsers = () => {
	const users = safeParse(localStorage.getItem(USERS_STORAGE_KEY), []);
	return Array.isArray(users) ? users : [];
};
const readSessionUser = () =>
	safeParse(localStorage.getItem(SESSION_STORAGE_KEY), null);

const createUserId = () =>
	typeof crypto !== "undefined" && crypto.randomUUID
		? crypto.randomUUID()
		: `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(readSessionUser);

	useEffect(() => {
		if (user) {
			localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
			return;
		}

		localStorage.removeItem(SESSION_STORAGE_KEY);
	}, [user]);

	const login = ({ usernameOrEmail, password }) => {
		const identifier = usernameOrEmail.trim().toLowerCase();
		const users = readUsers();
		const matchedUser = users.find(
			(candidate) =>
				candidate.username.toLowerCase() === identifier ||
				candidate.email.toLowerCase() === identifier,
		);

		if (!matchedUser || matchedUser.password !== password) {
			return { ok: false, message: "Invalid username/email or password." };
		}
		const sessionUser = {
			id: matchedUser.id,
			username: matchedUser.username,
			email: matchedUser.email,
		};

		setUser(sessionUser);
		return { ok: true, message: "Logged in successfully." };
	};

	const register = ({ username, email, password }) => {
		const trimmedUsername = username.trim();
		const trimmedEmail = email.trim().toLowerCase();
		const users = readUsers();
		const alreadyExists = users.some(
			(candidate) =>
				candidate.email.toLowerCase() === trimmedEmail ||
				candidate.username.toLowerCase() === trimmedUsername.toLowerCase(),
		);

		if (alreadyExists) {
			return {
				ok: false,
				message: "A user with this username or email already exists.",
			};
		}
		const newUser = {
			id: createUserId(),
			username: trimmedUsername,
			email: trimmedEmail,
			password,
		};

		localStorage.setItem(
			USERS_STORAGE_KEY,
			JSON.stringify([...users, newUser]),
		);
		const sessionUser = {
			id: newUser.id,
			username: newUser.username,
			email: newUser.email,
		};
		setUser(sessionUser);
		return { ok: true, message: "Account created successfully." };
	};

	const logout = () => setUser(null);

	const value = useMemo(
		() => ({
			user,
			isAuthenticated: Boolean(user),
			login,
			register,
			logout,
		}),
		[user],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used inside AuthProvider.");
	}

	return context;
};
