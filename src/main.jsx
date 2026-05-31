import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // 1. Change BrowserRouter to HashRouter here
import "./styles/global.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./hook/contextCart";
import { DarkModeProvider } from "./context/DarkModeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	// 2. Wrap your app in HashRouter instead (you can remove the basename prop)
	<HashRouter>
		<DarkModeProvider>
			<AuthProvider>
				<CartProvider>
					<App />
				</CartProvider>
			</AuthProvider>
		</DarkModeProvider>
	</HashRouter>,
);
