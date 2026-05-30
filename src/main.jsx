import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./hook/contextCart";
import { DarkModeProvider } from "./context/DarkModeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<DarkModeProvider>
			<AuthProvider>
				<CartProvider>
					<App />
				</CartProvider>
			</AuthProvider>
		</DarkModeProvider>
	</BrowserRouter>,
);
