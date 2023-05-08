import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import mobileKeyboardHandler from "./utils/mobileKeyboardHandler";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

mobileKeyboardHandler();
