import "./App.css";
import ChatPage from "./page/ChatPage";
import Header from "./Layout/Header";
import { Box } from "@mui/material";

function App() {
	return (
		<Box width="100vw" maxWidth="100vw">
			<Header />
			<ChatPage />
		</Box>
	);
}

export default App;
